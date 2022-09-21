import React from 'react';
import { AuthContext } from '../helper/auth';
import { Adm } from './template/AdmPage';
import { Student } from './template/StudentPage';
import { Teacher } from './template/TeacherPage';


export const LoggedPage = () => {
  const auth = React.useContext(AuthContext)

  if(auth.getUser().role === 0) {
    return <Adm />
  } else if(auth.getUser().role === 1) {
  return <Teacher />
  } else if(auth.getUser().role === 2) {
    return <Student />
  }
}