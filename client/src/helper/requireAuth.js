import React from 'react';
import { Navigate } from "react-router-dom"
import { AuthContext } from "./auth"

export const RequireAuth = ({ children }) => {
  const auth = React.useContext(AuthContext)

  if(!auth.getUser()) {
    return <Navigate to='/signin' />
  }

  return children
}