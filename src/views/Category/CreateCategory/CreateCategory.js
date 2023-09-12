import React from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow } from '@coreui/react'
import axiosInstance from 'src/api/axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const naviagte = useNavigate()
  const auth = useAuth()

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/categories/create-category', data)
      if (response.data.success) {
        toast.success('Category is added succesfully', {
          duration: 4000,
          position: 'bottom-center',
        })

        setTimeout(() => {
          naviagte('/categories/category-list')
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
      <CButton onClick={() => auth.setUser(null)}> sign out</CButton>
      <CRow className="mb-3 ">
        <CCol md={6}>
          <CFormLabel htmlFor="name" className="fw-semibold">
            Category Name:
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

export default CreateCategory
