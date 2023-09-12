import React from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow } from '@coreui/react'
import axiosInstance from 'src/api/axios'
import { API_ENDPOINTS } from 'src/api/URL'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const CreateUnit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const naviagte = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/units/create-unit', data)
      if (response.data.success) {
        toast.success('Unit is added succesfully', {
          duration: 4000,
          position: 'bottom-center',
        })

        setTimeout(() => {
          naviagte('/units/unit-list')
        }, 1000)
      }
    } catch (error) {
      toast.error('Failed to create category', {
        duration: 4000,
        position: 'bottom-center',
      })
    }
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="mb-3 ">
        <CCol md={6}>
          <CFormLabel htmlFor="name" className="fw-semibold">
            Unit Name
          </CFormLabel>
          <CFormInput
            type="text"
            id="name"
            autoComplete="off"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
              validate: {
                categoryAvailablity: async (fieldValue) => {
                  const response = await axiosInstance.get(`categories/?name=${fieldValue}`)
                  return response?.data?.data?.data.length == 0 || 'This category is already exist'
                },
              },
              maxLength: 15,
            })}
          />
          {errors.name && <small className="text-danger fw-semibold">{errors.name?.message}</small>}
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CCol>
      </CRow>
      <Toaster />
    </CForm>
  )
}

export default CreateUnit
