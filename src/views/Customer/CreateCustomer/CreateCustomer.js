import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCol,
  CRow,
  CContainer,
  CFormTextarea,
} from '@coreui/react'
import { Toaster, toast } from 'react-hot-toast'
import Select from 'react-select'
import { useGenderOptions } from 'src/hooks/useGenderOptions'
import { useCityOptions } from 'src/hooks/useCityOptions'
import { useAddNewCustomer } from 'src/hooks/useCustomersData'

const CreateCustomer = () => {
  const genderOptions = useGenderOptions()
  const cityOptions = useCityOptions()

  const onSuccess = () => {
    toast.success('Customer is added succesfully', {
      duration: 4000,
    })
  }

  const onError = () => {
    toast.error('Failed to add customer', {
      duration: 4000,
      position: 'bottom-center',
    })
  }
  const { mutate } = useAddNewCustomer(onError, onSuccess)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      gender: data.gender.label,
      city: data.city.label,
      profileImage: 'https://example.com/profiles/johndoe.jpg',
    }
    mutate(newData)
    reset()
  }

  return (
    <CContainer>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <CRow md={{ gutterY: 4 }}>
          <CCol md={6}>
            <CFormLabel htmlFor="name" className="fw-semibold">
              Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="name"
              placeholder="Enter name"
              {...register('name', { required: true, maxLength: 20 })}
            />
            {errors.name && <span>Name is required</span>}
          </CCol>

          {/* Email */}
          <CCol md={6}>
            <CFormLabel htmlFor="email" className="fw-semibold">
              Email
            </CFormLabel>
            <CFormInput
              type="text"
              id="email"
              placeholder="Enter email"
              {...register('email', { required: true, maxLength: 20 })}
            />
            {errors.email && <span> Email is required</span>}
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

          {/* Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="contactNo1" className="fw-semibold">
              Contact No 1
            </CFormLabel>
            <CFormInput
              type="text"
              id="contactNo1"
              placeholder="Enter contact number"
              {...register('contactNo1', { required: true, maxLength: 20 })}
            />
            {errors.contactNo1 && <span>Contact No is required</span>}
          </CCol>

          {/* Extra Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="contactNo2" className="fw-semibold">
              Contact No 2
            </CFormLabel>
            <CFormInput
              type="text"
              id="contactNo2"
              placeholder="Enter contact number"
              {...register('contactNo2', { maxLength: 20 })}
            />
          </CCol>

          {/* Shipping address */}
          <CCol md={12}>
            <CFormLabel htmlFor="shippingAddress" className="fw-semibold">
              Shipping Address
            </CFormLabel>
            <CFormTextarea
              id="shippingAddress"
              {...register('shippingAddress', { required: false })}
              placeholder="Enter street address"
              rows={4}
            ></CFormTextarea>
          </CCol>

          {/* City */}
          <CCol md={6}>
            <CFormLabel htmlFor="city" className="fw-semibold">
              City
            </CFormLabel>
            <Controller
              control={control}
              name="city"
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} name="city" placeholder="Select city" options={cityOptions} />
              )}
            />
            {errors.city && <span>City is required</span>}
          </CCol>
          {/* Zip Code */}
          <CCol md={6}>
            <CFormLabel htmlFor="zipCode" className="fw-semibold">
              Zip Code
            </CFormLabel>
            <CFormInput
              type="number"
              id="zipCode"
              name="zipCode"
              placeholder="Enter zip code"
              min={0}
              {...register('zipCode', {
                required: true,
                valueAsNumber: true,
              })}
            />
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol>
            <CButton type="submit" color="primary">
              Create Customer
            </CButton>
          </CCol>
        </CRow>
        <Toaster position="bottom-center" />
      </CForm>
      <Toaster />
    </CContainer>
  )
}

export default CreateCustomer
