import React, { useState } from "react"
import { fetcher } from "../helper/fetcher"
import { Signin } from "./template/Signin"
import { Signup } from "./template/Signup"
import { URL_BASE } from '../helper/constants'
import { useNavigate } from 'react-router';
import { AuthContext } from "../helper/auth"
import jwt_decode from "jwt-decode";
import { AlertModal } from "../components/AlertModal"

export const Sign = ({ isSignin }) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('');

  const auth = React.useContext(AuthContext)

  const changeAuthMode = () => {
    navigate(isSignin ? '/signup' : '/signin')
  }

  const errorPopupModal = (body) => {
    setShow(true)
    setTitle('Erro!')
    setBody(body)
    setColor('#ff615d')
  } 

  const signupSubmit = async (body) => {
    try {
      const response = await fetcher(URL_BASE + '/api/signup', 'POST', {'Content-Type': 'application/json'}, JSON.stringify(body))
      if(response.message) throw new Error(response.message)
      navigate('/signin')
    } catch(e) {
      console.error(e)
      errorPopupModal('Erro ao cadastrar o usuário!')
    }
    
  }

  const signinSubmit = async (body) => {
    try {
      const response = await fetcher(URL_BASE + '/api/signin', 'POST', {'Content-Type': 'application/json'}, JSON.stringify(body))
      if(response.message) throw new Error(response.message)
      const { token } = response;
      const decoded = jwt_decode(token);
      auth.login({...decoded, token})
      navigate('/dashboard')
    } catch(e) {
      console.error(e)
      errorPopupModal('Erro ao fazer login!')
    }
    
  }

  return (
    <>
    {
      isSignin ? 
      <Signin changeAuthMode={changeAuthMode} submit={signinSubmit}/> :
      <Signup changeAuthMode={changeAuthMode} submit={signupSubmit}/>
    }
    <AlertModal isShown={show} title={title} body={body} color={color} onClose={() => setShow(false)}/>

    </>
  )
}