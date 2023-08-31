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
import { useDeleteSupplier } from 'src/hooks/useSuppliers'

const DeleteSupplierModel = ({
  deletedSupplierId,
  isDeleteModalVisible,
  setIsDeleteModalVisible,
}) => {
  const { register, handleSubmit, watch } = useForm({})

  const onSuccess = () => {
    toast.success('Supplier is deleted succesfully', {
      duration: 4000,
    })
  }
  const onError = () => {
    toast.error('Failed to delete product', {
      duration: 4000,
    })
  }
  const { mutate } = useDeleteSupplier(onError, onSuccess)

  let typedText = watch('text')

  const onSubmit = () => {
    setIsDeleteModalVisible(false)
    mutate(deletedSupplierId)
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

export default DeleteSupplierModel
