import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import adminNavigations from '../_AdminNav'
import { AppContent, AppHeader, AppSidebar } from '../components/index'

const DefaultLayout = () => {
  let userRole = null
  const auth = useAuth()
  const navigate = useNavigate()

  if (auth?.user?.role === 'admin') {
    userRole = 'admin'
  } else if (auth?.user?.role === 'manager') {
    userRole = 'manager'
  } else {
    navigate('/login')
  }

  return (
    <div>
      {/* Role-specific navigation */}
      {userRole === 'admin' && <AppSidebar navigation={adminNavigations} />}
      {userRole === 'customer' && <AppSidebar navigation={customerNavigations} />}

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 mx-4 pt-4 border bg-white">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
