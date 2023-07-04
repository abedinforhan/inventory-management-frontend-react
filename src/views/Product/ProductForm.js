import React, { useState } from 'react'
import { CForm, CRow, CCol, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'

const ProductForm = () => {
  const [productName, setProductName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  // Mock data for dropdown options
  const brands = ['Brand A', 'Brand B', 'Brand C']
  const categories = ['Category A', 'Category B', 'Category C']

  const handleProductNameChange = (e) => {
    setProductName(e.target.value)
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submission logic here
    const product = {
      name: productName,
      brand: brand,
      price: price,
      quantity: quantity,
    }
    console.log('Product:', product)
    // Reset form fields after submission if needed
    setProductName('')
    setBrand('')
    setPrice(0)
    setQuantity(0)
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow style={{ display: 'flex', alignItems: 'center' }} md={{ gutterY: 4 }}>
        {/* Product Name */}
        <CCol xs={12} md={6}>
          <CFormLabel htmlFor="id">Product Name:</CFormLabel>
          <CFormInput
            type="text"
            id="product-name"
            required
            value={productName}
            onChange={handleProductNameChange}
            style={{ width: '100%' }}
          />
        </CCol>

        {/* Category Name */}
        <CCol xs={12} md={6}>
          <CFormLabel htmlFor="category">Select Category</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            options={[
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
            ]}
            style={{ width: '100%' }}
          />
        </CCol>

        {/* Brand Name */}
        <CCol xs={12} md={6}>
          <CFormLabel htmlFor="brand">Select Brand</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            options={[
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
            ]}
            style={{ width: '100%' }}
          />
        </CCol>
      </CRow>
    </CForm>
  )
}

export default ProductForm
