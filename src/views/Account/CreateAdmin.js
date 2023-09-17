import { cilCloudUpload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import Select from 'react-select'
import Loading from 'src/components/Loading/Loading'
import { useAddNewUser } from 'src/hooks/useAccount'
import { useGenderOptions } from 'src/hooks/useGenderOptions'
import { useLastUserID } from 'src/hooks/useUser'
import { uploadSingleImage } from 'src/utils/uploadImage'

const CreateAdmin = () => {
  const [profileImage, setProfileImage] = useState('')
  const [isButtonDisable, setIsButtonDisable] = useState(false)

  const genderOptions = useGenderOptions()
  const { isLoading, isError, data: lastUserData } = useLastUserID('admin')

  const onSuccess = () => {
    toast.success('User is added succesfully', {
      duration: 4000,
    })
  }

  const onError = () => {
    toast.error('Failed to add user', {
      duration: 4000,
      position: 'bottom-center',
    })
  }

  const { mutate } = useAddNewUser(onError, onSuccess)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      id: 'A' + (parseInt(lastUserData?.data?.data) + 1).toString().padStart(5, '0'),
      gender: null,
    },
  })

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    setIsButtonDisable(true)
    const profileImage = await uploadSingleImage(file)
    setProfileImage(profileImage)
    setIsButtonDisable(false)
  }

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      gender: data.gender.value,
      role: 'admin',
      profileImage,
    }

    mutate(newData)
    reset()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <CContainer>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CRow md={{ gutterY: 4 }}>
          {/* id */}
          <CCol md={6}>
            <CFormLabel htmlFor="id" className="fw-semibold">
              User ID
            </CFormLabel>
            <CFormInput
              type="text"
              id="id"
              disabled
              {...register('id', { required: true, maxLength: 20 })}
            />
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="password" className="fw-semibold">
              Password
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter a password"
              id="password"
              {...register('password', { required: true, maxLength: 30 })}
            />
          </CCol>

          {/* Name */}
          <CCol md={6}>
            <CFormLabel htmlFor="name" className="fw-semibold">
              Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="name"
              placeholder="Enter a name"
              {...register('name', { required: true, maxLength: 30 })}
            />
            {errors.name && <span>Name is required</span>}
          </CCol>

          {/* Gender */}
          <CCol md={6}>
            <CFormLabel htmlFor="gender" className="fw-semibold">
              Gender
            </CFormLabel>
            <Controller
              control={control}
              name="gender"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  name="gender"
                  placeholder="Select gender"
                  options={genderOptions}
                />
              )}
            />
            {errors.gender && <span>Gender is required</span>}
          </CCol>

          {/* Email */}
          <CCol md={6}>
            <CFormLabel htmlFor="email" className="fw-semibold">
              Email
            </CFormLabel>
            <CFormInput
              type="email"
              id="email"
              placeholder="Enter an email address"
              {...register('email', { required: true, maxLength: 30 })}
            />
            {errors.email && <span> Email is required</span>}
          </CCol>

          {/* Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="contactNo1" className="fw-semibold">
              Contact No
            </CFormLabel>
            <CFormInput
              type="text"
              id="contactNo"
              placeholder="Enter a contact number"
              {...register('contactNo', { required: true, maxLength: 20 })}
            />
            {errors.contactNo && <span>Contact No is required</span>}
          </CCol>

          {/* Emergency  Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="emergencyContactNo" className="fw-semibold">
              Emergency Contact No
            </CFormLabel>
            <CFormInput
              type="text"
              id="emergencyContactNo"
              placeholder="Enter a emergency contact number"
              {...register('emergencyContactNo', { maxLength: 20 })}
            />
          </CCol>

          {/* Designation */}

          <CCol md={6}>
            <CFormLabel htmlFor="designation" className="fw-semibold">
              Designation
            </CFormLabel>
            <CFormInput
              type="text"
              id="designation"
              placeholder="Enter a designation"
              {...register('designation', { required: true, maxLength: 20 })}
            />
            {errors.designation && <span>Contact No is required</span>}
          </CCol>

          <CCol md={12}>
            <label
              htmlFor="imageUpload"
              style={{
                padding: '50px',
                border: '2px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer', // Make the label look clickable
                display: 'block', // Ensure the label takes up the full width
                textAlign: 'center', // Center text horizontally
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <h5 className="mx-2">Upload Images</h5>
                <CIcon icon={cilCloudUpload} size="xxl" />
              </div>

              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                onChange={handleFileChange}
                style={{
                  display: 'none', // Hide the actual file input
                }}
              />
            </label>
          </CCol>
        </CRow>

        <CRow className="my-4">
          <CCol>
            <CButton disabled={isButtonDisable} type="submit" color="primary">
              Create Account
            </CButton>
          </CCol>
        </CRow>
        <Toaster position="bottom-center" />
      </CForm>
      <Toaster />
    </CContainer>
  )
}

export default CreateAdmin
