import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { useLogin } from 'src/hooks/useLogin'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const onError = (error) => {
    setError(error)
  }

  const onSuccess = (data) => {
    const accessToken = data?.data?.data?.accessToken || null

    //set token into local storage
    localStorage.setItem('accessToken', accessToken)

    const decodedToken = jwt_decode(accessToken)
    setUser(decodedToken)

    navigate(from, { replace: true })
  }

  const { mutate } = useLogin(onError, onSuccess)

  const onSubmit = async (data) => {
    setError('')
    mutate(data)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="id"
                        autoComplete="id"
                        {...register('id', { required: true, maxLength: 10 })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password', { required: true, maxLength: 20 })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      {error && (
                        <small className="text-green fw-semibold">
                          User id or password do not match !
                        </small>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
