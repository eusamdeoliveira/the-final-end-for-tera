import React from 'react'

export const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)

  const getUser = () => {
    if(user) return user
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if(storedUser) {
        setUser(storedUser)
        return storedUser
      }
    } catch(e) {
      console.error(e)
      return null
    }
    return null
  }

  const login = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value ={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}
