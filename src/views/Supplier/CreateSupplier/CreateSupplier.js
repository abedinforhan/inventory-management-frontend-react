import React, { useEffect, useState } from 'react'
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
import { useGetBrandsData } from 'src/hooks/useBrand'
import { useGenderOptions } from 'src/hooks/useGenderOptions'
import { useAddNewSupplier } from 'src/hooks/useSuppliers'

const CreateSupplier = () => {
  const { isLoading: isBrandLoading, data: brandOptions } = useGetBrandsData()
  const genderOptions = useGenderOptions()

  const onSuccess = () => {
    toast.success('Product is added succesfully', {
      duration: 4000,
    })
  }

  const onError = () => {
    toast.error('Failed to add product', {
      duration: 4000,
      position: 'bottom-center',
    })
  }
  const { mutate } = useAddNewSupplier(onError, onSuccess)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      brand: data.brand.value,
      gender: data.gender.value,
    }
    mutate(newData)
  }
  if (isBrandLoading) {
    return <h2> Loading ... </h2>
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
              placeholder="Enter supplier name"
              {...register('name', { required: true, maxLength: 20 })}
            />
            {errors.name && <span>Name is required</span>}
          </CCol>

          {/* Brand */}
          <CCol md={6}>
            <CFormLabel htmlFor="brand" className="fw-semibold">
              Brand
            </CFormLabel>
            <Controller
              control={control}
              name="brand"
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} name="brand" placeholder="Select brand" options={brandOptions} />
              )}
            />
            {errors.brand && <span>Brand No is required</span>}
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
            <CFormLabel htmlFor="contactNo" className="fw-semibold">
              Contact No
            </CFormLabel>
            <CFormInput
              type="text"
              id="contactNo"
              placeholder="Enter contact number"
              {...register('contactNo', { required: true, maxLength: 20 })}
            />
            {errors.contactNo && <span>Contact No is required</span>}
          </CCol>

          {/* Emergency Contact No */}
          <CCol md={6}>
            <CFormLabel htmlFor="email" className="fw-semibold">
              Emergency Contact No
            </CFormLabel>
            <CFormInput
              type="text"
              id="emergencyContactNo"
              placeholder="Enter emergency contact no"
              {...register('emergencyContactNo', { required: true, maxLength: 20 })}
            />
            {errors.emergencyContactNo && <span>Email is required</span>}
          </CCol>

          {/* Present address */}
          <CCol md={6}>
            <CFormLabel htmlFor="presentAddress" className="fw-semibold">
              Present Address
            </CFormLabel>
            <CFormTextarea
              id="presentAddress"
              {...register('presentAddress', { required: false })}
              placeholder="Enter present address"
              rows={2}
            ></CFormTextarea>
          </CCol>

          {/* Permanent Address */}
          <CCol md={6}>
            <CFormLabel htmlFor="permanentAddress" className="fw-semibold">
              Permanent Address
            </CFormLabel>
            <CFormTextarea
              id="permanentAddress"
              placeholder="Enter permanent address"
              {...register('permanentAddress', { required: false })}
              rows={2}
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol>
            <CButton type="submit" color="primary">
              Add Supplier
            </CButton>
          </CCol>
        </CRow>
        <Toaster position="bottom-center" />
      </CForm>
      <Toaster />
    </CContainer>
  )
}

export default CreateSupplier
