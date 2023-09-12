import React, { useState } from 'react'
import { CCol, CForm, CRow, CFormInput, CButton, CFormLabel } from '@coreui/react'
import Select from 'react-select'
import { useProductOptions } from 'src/hooks/useProductOptions'
import { Controller, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

const SellForm = ({ handleAddToCart }) => {
  const { isLoading: isProductOptionsLoading, data: productOptions } = useProductOptions()

  const [sellingPrice, setsellingPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      perUnitSellingPrice: 0,
      perUnitMaxPrice: 0,
      sellingQuantity: 0,
    },
  })

  const onSubmit = async (data) => {
    const { id, name, category, brand, unit } = data?.product?.other
    const { perUnitSellingPrice, perUnitMaxPrice, sellingQuantity } = data

    const purchasedProducts = {
      id,
      name,
      brand: brand.name,
      category: category.name,
      unit: unit.name,
      perUnitSellingPrice,
      perUnitMaxPrice,
      sellingQuantity,
      totalSellingPrice: parseFloat(perUnitSellingPrice) * parseInt(sellingQuantity),
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
            disabled
            {...register('perUnitMaxPrice', {
              required: true,
              valueAsNumber: true,
            })}
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
            {...register('sellingQuantity', {
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

export default SellForm
