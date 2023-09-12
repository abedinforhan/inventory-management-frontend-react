import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from 'src/api/axios'
import { API_ENDPOINTS } from 'src/api/URL'
import { useForm, Controller } from 'react-hook-form'
import { CForm, CFormLabel, CFormInput, CButton, CCol, CRow, CContainer } from '@coreui/react'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import { useGetBrandsData } from 'src/hooks/useBrand'
import { useUpdateSupplier } from 'src/hooks/useSuppliers'
import Loading from 'src/components/Loading/Loading'

function EditSupplier() {
  const { supplierId } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        const response = await axiosInstance.get(`/suppliers/${supplierId}`)
        const {
          name,
          email,
          gender,
          brand,
          permanentAddress,
          presentAddress,
          contactNo,
          emergencyContactNo,
        } = response?.data?.data

        return {
          name,
          email,
          gender: { label: gender, value: gender },
          brand: { label: brand.name, value: brand.id },
          contactNo,
          emergencyContactNo,
          presentAddress,
          permanentAddress,
        }
      } catch (error) {
        console.error('Error while fetching default values:', error)
        return {}
      }
    },
  })

  const onError = () => {
    toast.error('Failed to update supplier', {
      duration: 4000,
    })
  }

  const onSuccess = () => {
    toast.success('Supplier is updated succesfully', {
      duration: 4000,
    })
  }

  //fetching brand dropdown
  const { isLoading: isBrandLoading, data: brandOptions } = useGetBrandsData()

  //update existing supplier
  const { mutate } = useUpdateSupplier(onError, onSuccess)

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    setImageFile(file)
  }

  const api = `e7929fc7aa713162fc5bf0743b6b6ab4`

  const onSubmit = async (data) => {
    const updatedData = {
      supplierId,
      ...data,
      gender: data.gender.value,
      brand: data.brand.value,
    }
    mutate(updatedData)
  }

  if (isBrandLoading) {
    return <Loading />
  }

  return (
    <CContainer>
      <h5 className="my-4"> Edit New Supplier</h5>
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
            <CFormLabel htmlFor="brand" className="fw-semibold">
              Brand
            </CFormLabel>
            <Controller
              name="brand"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select {...field} name="brand" placeholder="Select Brand" options={brandOptions} />
              )}
            />
            {errors.brand && <p className="">Brand is required.</p>}
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
              Present Address
            </CFormLabel>
            <Controller
              name="presentAddress"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter Present Address" />
              )}
            />
            {errors.presentAddress && <p className="">Gender is required.</p>}
          </CCol>
          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="permanentAddress" className="fw-semibold">
              Permanent Address
            </CFormLabel>
            <Controller
              name="permanentAddress"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter Permanent Address" />
              )}
            />
            {errors.permanentAddress && <p className=""> Permanent address required.</p>}
          </CCol>

          <CCol md={6} sm={12} className="mt-2">
            <CFormLabel htmlFor="image" className="fw-semibold">
              Image
            </CFormLabel>

            <CFormInput onChange={handleImageChange} type="file" />
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

export default EditSupplier
