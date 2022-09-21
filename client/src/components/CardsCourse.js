import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../helper/auth';
import { fetcher } from '../helper/fetcher';
import { URL_BASE } from '../helper/constants';
import { useLocation, useNavigate } from 'react-router';

export const CardsCourse = () => {

  const auth = React.useContext(AuthContext)

  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState([])

  let isLoading = false;

  const subscribeToTheCourse = async (id) => {
    try {
      await fetcher(URL_BASE + '/api/subscriptions/new', 'POST', {'Content-Type': 'application/json', 'auth-token': auth.getUser().token}, JSON.stringify({id}))
      navigate(0)
    } catch(e) {
      console.error(e)
    }
    
  }

  useEffect(() => {
    async function fetchMyAPI() {

      const rawFilter = location.search.split('=')[1]

      const filter = rawFilter ? `?filter=${rawFilter}` : ''

      let response = await fetcher(URL_BASE + '/api/courses' + filter, 'GET', {'auth-token': auth.getUser().token})
      const items = []

      for (let i = 0; i < response.length; i++) {
        items.push(<Card style={{ width: '85vw', marginTop: '20px'}} >
        <Card.Body style={{cursor:'pointer'}} onClick={() => navigate('/questions', {state: {id: response[i].id}})}>
          <Card.Title>{response[i].name}</Card.Title>
          <Card.Text>
          {response[i].description}
          </Card.Text>
        </Card.Body>
        {
          auth.getUser().role === 2 && !response[i].issubscribed && (<Card.Footer><Button variant="primary" onClick={() => subscribeToTheCourse(response[i].id)}>Inscrever-se</Button></Card.Footer>)
        }
      </Card>)
      }
      setData(items)
    }
    isLoading = true
    fetchMyAPI()
  }, data)

  if(data[0] === undefined) {
    let body = (<h1>Nada a mostrar</h1>)
    if(isLoading) {
      isLoading = false;
      body = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      )
    }

    return (<div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{body}</div>); 
  }
  
  return (
    <>
      <h1 style={{margin: '20px 7vw'}}>Todos os cursos</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {data}
        <br />
      </div>
    </>
  )
}

