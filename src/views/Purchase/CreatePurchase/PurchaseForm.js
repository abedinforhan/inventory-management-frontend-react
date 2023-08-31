import React, { useRef, useState } from 'react'
import { CCol, CForm, CRow, CFormInput, CButton, CFormLabel } from '@coreui/react'
import Select from 'react-select'
import { useProductOptions } from 'src/hooks/useProductOptions'
import { Controller, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

const PurchaseForm = ({ handleAddToCart }) => {
  const { isLoading: isProductOptionsLoading, data: productOptions } = useProductOptions()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      perUnitBuyingPrice: 0,
      perUnitSellingPrice: 0,
      perUnitMaxPrice: 0,
      buyingQuantity: 0,
    },
  })

  const onSubmit = async (data) => {
    const { id, name, category, brand, unit } = data?.product?.other
    const { perUnitBuyingPrice, perUnitSellingPrice, perUnitMaxPrice, buyingQuantity } = data

    const purchasedProducts = {
      id,
      name,
      brand: brand.name,
      category: category.name,
      unit: unit.name,
      perUnitBuyingPrice,
      perUnitSellingPrice,
      perUnitMaxPrice,
      buyingQuantity,
      totalBuyingPrice: parseFloat(perUnitBuyingPrice) * parseInt(buyingQuantity),
    }
    handleAddToCart(purchasedProducts)
    reset()
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CRow md={{ gutterY: 4 }}>
        {/* Product options */}
        <CCol md={12}>
          <CFormLabel htmlFor="product" className="fw-semibold">
            Select Product
          </CFormLabel>
          <Controller
            control={control}
            name="product"
            placeholder="Select Product"
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                name="product"
                placeholder="Select Prodct"
                options={productOptions}
              />
            )}
          />
          {errors.product && <span>product is required</span>}
        </CCol>

        {/* perUnitBuyingPrice  */}
        <CCol md={4}>
          <CFormLabel htmlFor="perUnitBuyingPrice " className="fw-semibold">
            Buying Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitBuyingPrice"
            name="perUnitBuyingPrice"
            min={0}
            {...register('perUnitBuyingPrice', {
              required: true,
              valueAsNumber: true,
            })}
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
            {...register('perUnitSellingPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        {/* perUnitMaxPrice */}
        <CCol md={4}>
          <CFormLabel htmlFor="perUnitMaxPrice" className="fw-semibold">
            Maximum Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitMaxPrice"
            name="perUnitMaxPrice"
            min={0}
            {...register('perUnitMaxPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        {/* buyingQuantity */}
        <CCol md={4}>
          <CFormLabel htmlFor="buyingQuantity" className="fw-semibold">
            Quantity
          </CFormLabel>
          <CFormInput
            type="number"
            id="buyingQuantity"
            name="buyingQuantity"
            min={0}
            {...register('buyingQuantity', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>
      </CRow>

      <CRow className="my-4">
        <CCol>
          <CButton type="submit" color="primary">
            Add Product
          </CButton>
        </CCol>
      </CRow>
      <Toaster position="bottom-center" />
    </CForm>
  )
}

export default PurchaseForm
