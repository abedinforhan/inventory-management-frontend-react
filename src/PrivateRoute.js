import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default PrivateRoute
