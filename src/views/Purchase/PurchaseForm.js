import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import Select from 'react-select'
import { DevTool } from '@hookform/devtools'
import { CCol, CForm, CRow, CContainer, CFormInput, CButton } from '@coreui/react'
import axiosInstance from 'src/api/axiosInstance'
import { API_ENDPOINTS } from 'src/api/endPoints'

function PurchaseForm() {
  const [productOptions, setProductOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      products: [
        {
          name: '',
          buyingPrice: 0,
          sellingPrice: 0,
          quantity: 0,
        },
      ],
      vatTax: 0,
      shippingCost: 0,
      otherCost: 0,
    },
  })

  const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
    control,
    name: 'products',
  })

  // Fetch products from the server using Axios
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.get_products)
      const products = response.data.data.data

      const options = products.map((product) => ({
        label: product.name,
        value: product._id,
      }))
      // Set the category options
      setProductOptions(options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(watch('products', []))
  const watchedProducts = watch('products', [])
  const toalAmount = watchedProducts.reduce(
    (prev, current) => prev + current.buyingPrice + current.quantity,
    0,
  )
  console.log({ toalAmount })
  const onSubmit = (data) => console.log('data', data)
  return (
    <CContainer className="bg-white p-4 ">
      <CForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <CRow className="border">
          <CCol md={12}>
            {fields.map((item, index) => {
              return (
                <CRow key={item.id}>
                  <CCol md={6}>
                    <label className="my-2">Select Product {index}</label>
                    <Controller
                      name={`products.${index}.name`}
                      control={control}
                      render={({ field }) => <Select {...field} options={productOptions} />}
                    />
                  </CCol>
                  <CCol md={6}>
                    <label className="my-2">Buying Price</label>
                    <CFormInput
                      type="number"
                      name={`products.${index}.buyingPrice`}
                      defaultValue={0}
                      min={0}
                      {...register(`products.${index}.buyingPrice`, {
                        valueAsNumber: true,
                      })}
                    />
                  </CCol>
                  <CCol>
                    <label className="my-2">Selling Price</label>
                    <CFormInput
                      type="number"
                      name={`products.${index}.sellingPrice`}
                      defaultValue={0}
                      min={0}
                      {...register(`products.${index}.sellingPrice`, {
                        valueAsNumber: true,
                      })}
                    />
                  </CCol>
                  <CCol>
                    <label className="my-2">Quantity </label>
                    <CFormInput
                      type="number"
                      name={`products.${index}.quantity`}
                      defaultValue={0}
                      min={0}
                      {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                    />
                  </CCol>
                  <CCol>
                    <label className="my-2">Total Buying Amount </label>
                    <CFormInput
                      type="number"
                      name={`products.${index}.quantity`}
                      value={
                        watch(`products.${index}.buyingPrice`) *
                          watch(`products.${index}.quantity`) || 0
                      }
                      min={0}
                      readOnly
                    />
                  </CCol>
                  <CCol>
                    <label className="my-2"> Total Selling Amount </label>
                    <CFormInput
                      type="number"
                      name={`products.${index}.amount`}
                      value={
                        watch(`products.${index}.buyingPrice`) * watch(`products.${index}.quantity`)
                      }
                      min={0}
                      readOnly
                      {...register(`products.${index}.amount`)}
                    />
                    <div className="my-4 ">
                      <CButton
                        className="me-2"
                        type="button"
                        size="sm"
                        onClick={() => {
                          append()
                        }}
                      >
                        Add +
                      </CButton>
                      {index > 0 && (
                        <CButton
                          className="me-2"
                          type="button"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </CButton>
                      )}
                    </div>
                  </CCol>
                </CRow>
              )
            })}
          </CCol>

          <CCol md={12}>
            <label className="my-2">Vat Tax</label>
            <CFormInput
              type="number"
              name="vatTax"
              defaultValue={0}
              min={0}
              {...register('vatTax')}
            />
            <label className="my-2">Shipping Cost</label>
            <CFormInput
              type="number"
              name="vatTax"
              defaultValue={0}
              min={0}
              {...register('shippingCost')}
            />
            <label className="my-2">Other Cost ( if any )</label>
            <CFormInput
              type="number"
              name="vatTax"
              defaultValue={0}
              min={0}
              {...register('otherCost')}
            />
            <CButton type="submit" size="sm" className="my-4 ">
              Submit
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      <DevTool control={control} /> {/* set up the dev tool */}
    </CContainer>
  )
}

export default PurchaseForm
