import jwtDecode from 'jwt-decode'
import React from 'react'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    //get token from local storage
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      //verify token from backend
      return jwtDecode(localStorage.getItem('accessToken'))
    }

    return null
  })

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('accessToken')
  }

  const value = { user, setUser, handleLogout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
