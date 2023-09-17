import { CCol, CContainer, CRow } from '@coreui/react'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
import { useAuth } from 'src/hooks/useAuth'
import { useSingleUserData } from 'src/hooks/useUser'

const Profile = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  //get userId from auth
  const userId = auth?.user?.userId
  //fetch user  data
  const { isLoading, isError, data: singleUserData } = useSingleUserData(userId)

  if (isLoading) {
    return <Loading />
  }
  const { name, gender, email, contactNo, emergencyContactNo, profileImage, address, designation } =
    singleUserData?.data?.data || {}

  const handleNavigate = () => {
    navigate('/users/edit-profile')
  }

  return (
    <CContainer className="p-4">
      <CRow>
        <h4>My Profile</h4>
        <CCol className="border my-4 py-2 d-flex justify-content-between">
          <div className="d-flex">
            <img src={profileImage} alt="Profile" width="150" height="150" />

            <div className="ms-4">
              <h6>{name}</h6>
              <p>
                {designation} <br />
                Bangladesh
              </p>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="border py-2">
        {/* View Part */}
        <CCol>
          <CRow md={{ gutterY: 2 }}>
            <CCol md={12} className="d-flex justify-content-between">
              <div>
                <h4>Personal Details</h4>
              </div>
              <div className="mouse-pointer" onClick={handleNavigate}>
                <CiEdit size={28} />
              </div>
            </CCol>
            <CCol md={6}>
              <small>Name</small>
              <p className="fw-semibold">{name}</p>
            </CCol>

            <CCol md={6}>
              <small>Gender</small>
              <p className="fw-semibold">{gender}</p>
            </CCol>

            <CCol md={6}>
              <small>Email Address</small>
              <p className="fw-semibold">{email}</p>
            </CCol>

            <CCol md={6}>
              <small>Contact Address</small>
              <p className="fw-semibold">{contactNo}</p>
            </CCol>

            <CCol md={6}>
              <small>Emergency Contact Address</small>
              <p className="fw-semibold">{emergencyContactNo}</p>
            </CCol>
            <CCol md={6}>
              <small>Address</small>
              <p className="fw-semibold">{address}</p>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
