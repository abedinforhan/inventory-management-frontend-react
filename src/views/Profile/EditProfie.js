import { cilCloudUpload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import { useAuth } from 'src/hooks/useAuth'
import { useSingleUserData, useUpdateUser } from 'src/hooks/useUser'
import { uploadSingleImage } from 'src/utils/uploadImage'

function EditProfile() {
  const [image, setImage] = useState('')
  const [isButtonDisable, setIsButtonDisable] = useState(false)
  const {
    user: { userId },
    setUser,
  } = useAuth()

  const { isLoading, isError, data: singleUserData } = useSingleUserData(userId)

  // destructuring the properties
  const { name, gender, email, contactNo, emergencyContactNo, address, designation, profileImage } =
    singleUserData?.data?.data || {}

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name,
      email,
      gender: { label: gender, value: gender },
      contactNo,
      emergencyContactNo,
      address,
      designation,
      profileImage: image,
    },
  })

  const onError = () => {
    toast.error('Failed to update profile', {
      duration: 4000,
    })
  }

  const onSuccess = () => {
    toast.success('Profile is updated succesfully', {
      duration: 4000,
    })

    setUser((prev) => ({
      ...prev,
      profileImage: image,
    }))
  }

  //update existing supplier
  const { mutate } = useUpdateUser(onError, onSuccess)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    setIsButtonDisable(true)
    const image = await uploadSingleImage(file)
    setImage(image)
    setIsButtonDisable(false)
  }

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      gender: data?.gender.value,
      userId,
    }

    mutate(updatedData)
  }
  return (
    <CContainer>
      <h5 className="my-4">Edit Profile</h5>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CRow>
          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="name" className="fw-semibold">
              Name
            </CFormLabel>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter Full Name" />
              )}
            />
            {errors.name && <p className="">Name is required.</p>}
          </CCol>

          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="email" className="fw-semibold">
              Email
            </CFormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="email" placeholder="Enter Email" />
              )}
            />
            {errors.email && <p className="">Email is required.</p>}
          </CCol>
          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="gender" className="fw-semibold">
              Gender
            </CFormLabel>
            <Controller
              name="gender"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Gender"
                  options={[
                    {
                      label: 'male',
                      value: 'male',
                    },
                    {
                      label: 'female',
                      value: 'female',
                    },
                    {
                      label: 'other',
                      value: 'other',
                    },
                  ]}
                />
              )}
            />
            {errors.gender && <p className="">Brand is required.</p>}
          </CCol>

          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="contactNo" className="fw-semibold">
              Contact No
            </CFormLabel>
            <Controller
              name="contactNo"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="number" min="0" placeholder="Enter Contact No" />
              )}
            />
            {errors.contactNo && <p className="">Contact No is required.</p>}
          </CCol>

          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="emergencyContactNo" className="fw-semibold">
              Emergency Contact No
            </CFormLabel>
            <Controller
              name="emergencyContactNo"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="number" placeholder="Enter Emergency Contact No" />
              )}
            />
            {errors.emergencyContactNo && <p className="mt-1">Emergency Contact No is required.</p>}
          </CCol>
          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="presentAddress" className="fw-semibold">
              Address
            </CFormLabel>
            <Controller
              name="address"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter  Address" />
              )}
            />
            {errors.address && <p className=""> Address is required.</p>}
          </CCol>

          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="designation" className="fw-semibold">
              Designation
            </CFormLabel>
            <Controller
              name="designation"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter designation" />
              )}
            />
            {errors.designation && <p className=""> Designation is required.</p>}
          </CCol>

          <CCol md={12} className="mt-4">
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

          <CCol md="12" className="mt-4">
            <CButton type="submit" color="primary">
              Add Supplier
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      <Toaster />
    </CContainer>
  )
}

export default EditProfile
