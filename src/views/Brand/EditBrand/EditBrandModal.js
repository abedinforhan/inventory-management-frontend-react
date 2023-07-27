import React from 'react'
import { useForm } from 'react-hook-form'
import './EditBrandModal.css'
import { API_ENDPOINTS } from 'src/api/endPoints'
import axiosInstance from 'src/api/axiosInstance'

const EditBrandModal = ({ editedData, isOpen, closeModal, onClearEditedData, toast }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: editedData?.name,
      description: editedData?.description,
    },
  })

  // API
  const brandUrl = API_ENDPOINTS.get_brands

  // Save edited data to the database
  const onSubmit = async (data) => {
    try {
      // Make API request to save the edited item
      const result = await axiosInstance.patch(`${brandUrl}/${editedData._id}`, data)

      if (result.data.success) {
        closeModal()
        toast.success(result.data.message)
        onClearEditedData()
      }
    } catch (error) {
      toast.error('Failed to update data')
    }
  }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Brand</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" {...register('description')} />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBrandModal
