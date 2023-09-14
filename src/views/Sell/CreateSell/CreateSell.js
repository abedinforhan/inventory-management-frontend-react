import React, { useEffect, useMemo, useState } from 'react'
import { CCol, CRow, CContainer, CButton, CFormInput, CFormLabel, CForm } from '@coreui/react'
import { Toaster, toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useAddNewPurchase } from 'src/hooks/usePurchasesData'
import SellTable from './SellTable'
import SellForm from './SellForm'
import { useCustomerOptions } from 'src/hooks/useCustomerOptions'
import { useAddNewSell } from 'src/hooks/useSell'

function CreateSell() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vatTax: 0,
      shippingCost: 0,
      otherCost: 0,
    },
  })
  const onSuccess = () => {
    toast.success('Sell is created succesfully', {
      duration: 4000,
    })
  }
  const onError = () => {
    toast.error('Failed to create purchase', {
      duration: 4000,
    })
  }
  const { isLoading: isCustomersLoading, data: customersOptions } = useCustomerOptions()

  const { mutate } = useAddNewSell(onError, onSuccess)

  const [totalSoldCost, setTotalSoldCost] = useState(0)

  const [cart, setCart] = useState([])

  const watchFormValues = watch(['vatTax', 'shippingCost', 'otherCost'])

  const handleAddToCart = (purchasedProducts) => {
    setCart((previousData) => [...previousData, purchasedProducts])
  }

  const handleRemoveFromCart = (rowId) => {
    const remaining = cart.slice(0, rowId).concat(cart.slice(rowId + 1))
    setCart(remaining)
  }

  const totalCost = useMemo(() => {
    return cart.reduce(
      (prev, current) =>
        prev + parseFloat(current.perUnitSellingPrice) * parseInt(current.sellingQuantity),
      0,
    )
  }, [cart])

  useEffect(() => {
    setTotalSoldCost(totalCost)
  }, [totalCost])

  const onSubmit = (data) => {
    const { vatTax, shippingCost, otherCost, customer } = data
    const newData = {
      vatTax,
      shippingCost,
      otherCost,
      grandTotal: totalSoldCost + vatTax + shippingCost + otherCost,
      customer: {
        name: customer?.label,
        id: customer?.value,
      },
      products: cart,
    }

    mutate(newData)
    setCart([])
  }

  return (
    <CContainer className="bg-white">
      <CRow className="py-2" md={{ gutterX: 4 }}>
        <CCol md={3}>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CRow md={{ gutterY: 4 }}>
              {/* Customer options */}
              <CCol md={12}>
                <CFormLabel htmlFor="customer" className="fw-semibold">
                  Select Customer
                </CFormLabel>
                <Controller
                  control={control}
                  name="customer"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="customer"
                      placeholder="Select Customer "
                      options={customersOptions}
                    />
                  )}
                />
                {errors.customer && <span>Customer is required</span>}
              </CCol>

              {/* vatTax*/}
              <CCol md={12}>
                <CFormLabel htmlFor="vatTax" className="fw-semibold">
                  Vat/Tax
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="vatTax"
                  name="vatTax"
                  min={0}
                  {...register('vatTax', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </CCol>

              {/* shippingCost */}
              <CCol md={12}>
                <CFormLabel htmlFor="shippingCost" className="fw-semibold">
                  Shipping Cost
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="shippingCost"
                  name="shippingCost"
                  min={0}
                  {...register('shippingCost', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </CCol>

              {/* otherCost */}
              <CCol md={12}>
                <CFormLabel htmlFor="otherCost" className="fw-semibold">
                  Other Cost
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="otherCost"
                  name="otherCost"
                  min={0}
                  {...register('otherCost', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </CCol>
            </CRow>

            <CRow className="my-4">
              <CCol>
                <CButton type="submit" color="primary" disabled={!cart.length}>
                  Submit
                </CButton>
              </CCol>
            </CRow>
            <Toaster position="bottom-center" />
          </CForm>
        </CCol>
        <CCol md={9}>
          <SellForm handleAddToCart={handleAddToCart} />
        </CCol>
      </CRow>
      <hr />
      {cart.length > 0 && (
        <SellTable
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          totalSoldCost={totalSoldCost}
          vatTax={watchFormValues?.[0]}
          shippingCost={watchFormValues?.[1]}
          otherCost={watchFormValues?.[2]}
        />
      )}
    </CContainer>
  )
}

export default CreateSell
