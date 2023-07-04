import React, { useState } from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow } from '@coreui/react'

const Category = () => {
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Category:', category)
    // Perform any necessary form submission logic here
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <CForm noValidate onSubmit={handleSubmit}>
      <CRow className="mb-3">
        <CCol>
          <CFormLabel htmlFor="category">Create Category : </CFormLabel>
          <CFormInput type="text" id="category" required value={category} onChange={handleChange} />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CButton type="submit" color="primary">
            Button
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default Category
