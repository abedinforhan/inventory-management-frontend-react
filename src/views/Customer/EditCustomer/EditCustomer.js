import React from 'react'
import { useParams } from 'react-router-dom'
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
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import Loading from 'src/components/Loading/Loading'
import { useGenderOptions } from 'src/hooks/useGenderOptions'
import { useCityOptions } from 'src/hooks/useCityOptions'
import { useSingleCustomer, useUpdateCustomer } from 'src/hooks/useCustomersData'
import { useBrandOptions } from 'src/hooks/useBrandOptions'

function EditCustomer() {
  const { customerId } = useParams()
  const genderOptions = useGenderOptions()
  const cityOptions = useCityOptions()

  const { isLoading: isBrandOptionsLoading, data: brandOptions } = useBrandOptions()
  const { isLoading: isCustomerDataLoading, data: customerData } = useSingleCustomer(customerId)

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    values: {
      name: customerData?.name || '',
      email: customerData?.email || '',
      gender: customerData?.gender
        ? { label: customerData?.gender, value: customerData.gender }
        : null,
      contactNo1: customerData?.contactNo1 || '',
      contactNo2: customerData?.contactNo2 || '',
      shippingAddress: customerData?.shippingAddress || '',
      city: customerData?.city
        ? { label: customerData?.city, value: customerData?.city.value }
        : null,
      zipCode: customerData?.zipCode || '',
    },
  })

  const onError = () => {
    toast.error('Failed to update customer', {
      duration: 2000,
    })
  }

  const onSuccess = () => {
    toast.success('Customer is updated succesfully', {
      duration: 4000,
    })
  }

  //update existing supplier
  const { mutate } = useUpdateCustomer(customerId, onError, onSuccess)

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    setImageFile(file)
  }

  const api = `e7929fc7aa713162fc5bf0743b6b6ab4`

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      gender: data.gender?.value,
      city: data.city?.value,
    }

    mutate(updatedData)
  }

  if (isBrandOptionsLoading || isCustomerDataLoading) {
    return <Loading />
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
            {errors.contactNo1 && <span>Contact No 1 is required</span>}
          </CCol>

          {/* Extra Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="contactNo2" className="fw-semibold">
              Contact No 2 (Optional)
            </CFormLabel>
            <CFormInput
              type="text"
              id="contactNo2"
              placeholder="Enter contact number"
              {...register('contactNo2', { maxLength: 20 })}
            />
          </CCol>
          {/* Street address */}
          <CCol md={12}>
            <CFormLabel htmlFor="shippingAddress" className="fw-semibold">
              Shipping Address
            </CFormLabel>
            <CFormTextarea
              id="shippingAddress"
              {...register('shippingAddress', { required: false })}
              placeholder="Enter shipping address"
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
            {errors.gender && <span>Gender is required</span>}
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
      </CForm>
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default EditCustomer
