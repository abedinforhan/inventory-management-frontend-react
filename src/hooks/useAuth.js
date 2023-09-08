const { useContext } = require('react')
const { AuthContext } = require('src/layout/AuthProvider')

export const useAuth = () => {
  return useContext(AuthContext)
}
