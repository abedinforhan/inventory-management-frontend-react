import React, { useEffect, useMemo, useState } from 'react'
import { CCol, CRow, CContainer, CButton, CFormInput, CFormLabel, CForm } from '@coreui/react'
import PurchaseForm from './PurchaseForm'
import PurchasedTable from './PurchasedTable'
import { Toaster, toast } from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useSuppliersOptions } from 'src/hooks/useSuppliersOptions'
import { useAddNewPurchase } from 'src/hooks/usePurchasesData'

function CreatePurchase() {
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
    toast.success('Purchase is added succesfully', {
      duration: 4000,
    })
  }
  const onError = () => {
    toast.error('Failed to create purchase', {
      duration: 4000,
    })
  }
  const { isLoading: isSupppliersLoading, data: suppliersOptions } = useSuppliersOptions()
  const { mutate } = useAddNewPurchase(onError, onSuccess)

  const [totalPurchasedCost, setTotalPurchasedCost] = useState(0)
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
        prev + parseFloat(current.perUnitBuyingPrice) * parseInt(current.buyingQuantity),
      0,
    )
  }, [cart])

  useEffect(() => {
    setTotalPurchasedCost(totalCost)
  }, [totalCost])

  const onSubmit = (data) => {
    const { vatTax, shippingCost, otherCost, supplier } = data
    const newData = {
      vatTax,
      shippingCost,
      otherCost,
      grandTotal: totalPurchasedCost + vatTax + shippingCost + otherCost,
      supplier: {
        name: supplier?.label,
        id: supplier?.value,
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
              {/* Supplier options */}
              <CCol md={12}>
                <CFormLabel htmlFor="product" className="fw-semibold">
                  Select Supplier
                </CFormLabel>
                <Controller
                  control={control}
                  name="supplier"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      name="supplier"
                      placeholder="Select Supplier"
                      options={suppliersOptions}
                    />
                  )}
                />
                {errors.product && <span>product is required</span>}
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
          <PurchaseForm handleAddToCart={handleAddToCart} />
        </CCol>
      </CRow>
      <hr />
      {cart.length > 0 && (
        <PurchasedTable
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          totalPurchasedCost={totalPurchasedCost}
          vatTax={watchFormValues?.[0]}
          shippingCost={watchFormValues?.[1]}
          otherCost={watchFormValues?.[2]}
        />
      )}
    </CContainer>
  )
}

export default CreatePurchase
