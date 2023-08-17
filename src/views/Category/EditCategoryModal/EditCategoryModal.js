import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axiosInstance from 'src/API/axiosInstance'

const EditCategoryModal = ({
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
      name: editableData?.name,
    },
  })

  // Save edited data to the database
  const onSubmit = async (data) => {
    try {
      const result = await axiosInstance.patch(`categories/${editableData._id}`, data)

      if (result.data.success) {
        setEditableData(data)
        setIsEditModalVisible(false)
        toast.success('Category is updated successfully')
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
          <CForm className="row mb-2" onSubmit={handleSubmit(onSubmit)}>
            <CRow>
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CCol md={12} className="mb-4">
                <CFormInput
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <small className="text-danger">{errors?.name?.message}</small>}
              </CCol>

              <CCol xs={12}>
                <CButton disabled={!isDirty} type="submit" color="primary">
                  Save changes
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default EditCategoryModal
