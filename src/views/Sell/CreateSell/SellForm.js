import React, { useEffect, useState } from 'react'
import { CCol, CForm, CRow, CFormInput, CButton, CFormLabel } from '@coreui/react'
import Select from 'react-select'
import { useProductOptions } from 'src/hooks/useProductOptions'
import { Toaster } from 'react-hot-toast'

const SellForm = ({ handleAddToCart }) => {
  const { isLoading: isProductOptionsLoading, data: productOptions } = useProductOptions()

  const [soldProduct, setSoldProduct] = useState({
    id: '',
    name: '',
    brand: '',
    category: '',
    unit: '',
    perUnitSellingPrice: 0,
    sellingQuantity: 0,
    totalSellingPrice: 0,
  })

  const handleProductChange = (option) => {
    const { other } = option

    setSoldProduct({
      ...soldProduct,
      id: other?.id,
      name: other?.name,
      brand: other?.brand.name,
      category: other?.category?.name,
      unit: other?.unit.name,
      perUnitSellingPrice: other?.perUnitSellingPrice,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSoldProduct({
      ...soldProduct,
      [name]: parseFloat(value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddToCart({
      ...soldProduct,
      totalSellingPrice: soldProduct.perUnitSellingPrice * soldProduct.sellingQuantity,
    })
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow md={{ gutterY: 4 }}>
        {/* Product options */}
        <CCol md={12}>
          <CFormLabel htmlFor="product" className="fw-semibold">
            Select Product
          </CFormLabel>
          <Select
            name="product"
            placeholder="Select Product"
            options={productOptions}
            onChange={(option) => handleProductChange(option)}
          />
        </CCol>

        {/* perUnitSellingPrice */}
        <CCol md={4}>
          <CFormLabel htmlFor="perUnitSellingPrice" className="fw-semibold">
            Selling Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitSellingPrice"
            name="perUnitSellingPrice"
            min={0}
            value={soldProduct.perUnitSellingPrice}
            onChange={handleChange}
          />
        </CCol>

        {/* sellingQuantity */}
        <CCol md={4}>
          <CFormLabel htmlFor="sellingQuantity" className="fw-semibold">
            Quantity
          </CFormLabel>
          <CFormInput
            type="number"
            id="sellingQuantity"
            name="sellingQuantity"
            min={0}
            value={soldProduct.sellingQuantity}
            onChange={handleChange}
          />
        </CCol>
      </CRow>

      <CRow className="my-4">
        <CCol>
          <CButton
            type="submit"
            color="primary"
            className="mouse-pointer"
            // disabled={!sellingQuantity}
          >
            Add Product
          </CButton>
        </CCol>
      </CRow>
      <Toaster position="bottom-center" />
    </CForm>
  )
}

export default SellForm
