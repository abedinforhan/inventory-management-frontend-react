import React, { useState } from 'react'
import { CForm, CFormLabel, CButton, CCol, CFormInput, CRow } from '@coreui/react'

const Brand = () => {
  const [brand, setBrand] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Brand:', brand)
    // Perform any necessary form submission logic here
  }

  const handleChange = (e) => {
    setBrand(e.target.value)
  }

  return (
    <CForm noValidate onSubmit={handleSubmit}>
      <CRow className="mb-3">
        <CCol>
          <CFormLabel htmlFor="brand">Create Brand : </CFormLabel>
          <CFormInput type="text" id="brand" required value={brand} onChange={handleChange} />
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

export default Brand
