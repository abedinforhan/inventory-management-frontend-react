import React from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow, CFormTextarea } from '@coreui/react'
import axiosInstance from 'src/api/axiosInstance'
import { API_ENDPOINTS } from 'src/api/endPoints'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const { register, handleSubmit } = useForm()
  const naviagte = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.crete_category, data)
      if (response.data.success) {
        naviagte('/categories/category-list')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="mb-3">
        <CCol>
          <CFormLabel htmlFor="name">Category Name:</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            autoComplete="off"
            {...register('name', { required: true, maxLength: 20 })}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default AddCategory
