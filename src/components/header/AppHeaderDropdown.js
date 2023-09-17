import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'

const AppHeaderDropdown = () => {
  const { handleLogout, user } = useAuth()
  const navigate = useNavigate()

  const handleProfileNavigate = () => {
    navigate('users/profile')
  }

  const handleSettingNavigate = () => {
    navigate('/settings/my-setting')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <img
          src={user?.profileImage}
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
          alt="Avatar"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        <CDropdownItem className="mouse-pointer" onClick={handleProfileNavigate}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem className="mouse-pointer" onClick={handleSettingNavigate}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} className="mouse-pointer">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
