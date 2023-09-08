import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import adminNavigations from '../_AdminNav'
import customerNavigations from '../_CustomerNav'
import { useAuth } from 'src/hooks/useAuth'

const DefaultLayout = () => {
  const userRole = 'customer'
  const user = useAuth()
  console.log(user)

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
