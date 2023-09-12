import jwtDecode from 'jwt-decode'
import React from 'react'

import { verifyToken } from 'src/utils/verifyToken'

export const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(async () => {
    //get token from local storage
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      //verify token from backen

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
