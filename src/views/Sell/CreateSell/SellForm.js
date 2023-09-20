import { CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import { useProductOptions } from 'src/hooks/useProductOptions'

const SellForm = ({ handleAddToCart }) => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      product: null,
      perUnitSellingPrice: 0,
      sellingQuantity: 0,
    },
  })

  const { isLoading: isProductOptionsLoading, data: availableOptions } = useProductOptions()

  //greater than 0

  const productOptions = availableOptions?.filter((option) => option?.other?.buyingQuantity > 0)

  //set maxium sell quantity

  const [maxQuantity, setMaxQuantity] = useState(0)

  const handleProductChange = (option) => {
    // Update form values when the product changes
    // setValue('product', { label: option.label, value: option.value })
    setValue('id', option.other?.id || '')
    setValue('name', option.other?.name || '')
    setValue('brand', option.other?.brand.name || '')
    setValue('category', option.other?.category?.name || '')
    setValue('unit', option.other?.unit.name || '')
    setValue('perUnitSellingPrice', option.other?.perUnitSellingPrice || 0)
    setValue('sellingQuantity', option.other?.buyingQuantity || 0)

    // set total buying quanity into max quantity
    setMaxQuantity(option?.other.buyingQuantity)
  }

  const onSubmit = (data) => {
    // Calculate totalSellingPrice based on form values
    data.totalSellingPrice = data.perUnitSellingPrice * data.sellingQuantity
    handleAddToCart(data)

    //reset the form
    reset()
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <CRow md={{ gutterY: 4 }}>
        {/* Product options */}
        <CCol md={12}>
          <label htmlFor="product" className="fw-semibold">
            Select Product
          </label>
          <Controller
            name="product"
            control={control}
            rules={{ required: { value: true, message: 'Please select a product' } }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Product"
                options={productOptions}
                onChange={(option) => {
                  field.onChange(option)
                  handleProductChange(option)
                }}
              />
            )}
          />
          <span className="error-message">{errors.product?.message}</span>
        </CCol>

        {/* perUnitSellingPrice */}
        <CCol md={6} className="col-md-4">
          <CFormLabel htmlFor="perUnitSellingPrice" className="fw-semibold">
            Selling Price (Per Unit)
          </CFormLabel>
          <CFormInput
            type="number"
            id="perUnitSellingPrice"
            readOnly
            {...register('perUnitSellingPrice', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </CCol>

        {/* sellingQuantity */}
        <CCol md={6} className="col-md-4">
          <CFormLabel htmlFor="sellingQuantity" className="fw-semibold">
            Quantity
          </CFormLabel>
          <CFormInput
            type="number"
            id="sellingQuantity"
            min={0}
            max={maxQuantity + 1}
            readOnly={!watch('product')}
            {...register('sellingQuantity', {
              required: true,
              min: {
                value: 1,
                message: 'Minium quantity is 1',
              },
              max: {
                value: maxQuantity,
                message: `Maximum available quantity is ${maxQuantity}`,
              },
            })}
          />
          <span className="error-message">{errors.sellingQuantity?.message}</span>
        </CCol>
      </CRow>

      <div className="my-4">
        <button
          type="submit"
          className="btn btn-primary"
          // Add any other conditions for disabling the button if needed
        >
          Add Product
        </button>
      </div>
      <Toaster position="bottom-center" />
    </CForm>
  )
}

export default SellForm
