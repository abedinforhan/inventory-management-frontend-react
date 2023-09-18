import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from 'src/api/URL'
import axiosInstance from 'src/api/axios'

const CreateBrand = () => {
  const { register, handleSubmit } = useForm()
  const naviagte = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.create_brand, data)
      if (response.data.success) {
        naviagte('/brands/brand-list')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow className="mb-3">
        <CCol>
          <CFormLabel htmlFor="name">Brand Name:</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            {...register('name', { required: true, maxLength: 20 })}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>
          <CFormLabel htmlFor="description">Description:</CFormLabel>
          <CFormTextarea
            id="description"
            {...register('description', { required: false })}
          ></CFormTextarea>
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

export default CreateBrand
