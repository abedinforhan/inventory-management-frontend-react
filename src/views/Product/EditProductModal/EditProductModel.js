import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axiosInstance from 'src/API/axiosInstance'

const EditProductModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  editableData,
  setEditableData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    values: {
      name: editableData?.name || '',
      description: editableData?.description || '',
    },
  })

  // Save edited data to the database
  const onSubmit = async (data) => {
    try {
      const result = await axiosInstance.patch(`brands/${editableData._id}`, data)

      if (result.data.success) {
        setEditableData(data)
        setIsEditModalVisible(false)
        toast.success('Brand is updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update data')
    }
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
      >
        <CModalHeader>
          <CModalTitle> Edit Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
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
        </CModalBody>
      </CModal>
    </>
  )
}

export default EditProductModal
