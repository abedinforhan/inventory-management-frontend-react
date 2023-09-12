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
  CRow,
} from '@coreui/react'
import axiosInstance from 'src/api/axios'

const DeleteCategoryModel = ({ editableData, isDeleteModalVisible, setIsDeleteModalVisible }) => {
  const { register, handleSubmit, watch, reset } = useForm({})

  let typedText = watch('text')

  // Save edited data to the database
  const onSubmit = async () => {
    try {
      // Make API request to save the edited item
      const result = await axiosInstance.delete(`categories/${editableData.id}`)

      if (result.data.success) {
        setIsDeleteModalVisible(false)
        reset()
        toast.success('Category is deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to update data')
    }
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <CModalBody>
          <CForm className="row mb-2" onSubmit={handleSubmit(onSubmit)}>
            <CRow>
              <CFormLabel htmlFor="name">
                Type
                <span className="fw-semibold me-2"> &apos;delete&apos;</span>
                to confirm
              </CFormLabel>
              <CCol md={12} className="mb-4">
                <CFormInput type="text" id="text" {...register('text')} />
              </CCol>

              <CCol xs={12}>
                <CButton disabled={typedText !== 'delete'} type="submit" color="primary">
                  Delete
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default DeleteCategoryModel
