import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import Select from 'react-select'
import {
  CCol,
  CForm,
  CRow,
  CContainer,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axiosInstance from 'src/API/axiosInstance'
import { API_ENDPOINTS } from 'src/API/URL'
import { AiFillDelete } from 'react-icons/ai'

function PurchaseForm() {
  const [productOptions, setProductOptions] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sellingPrice, setBuyingPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState([])

  const { register, control, handleSubmit, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      vatTax: 0,
      shippingCost: 0,
      otherCost: 0,
      grandTotal: grandTotal,
    },
  })

  const vatTax = watch('vatTax')
  const shippingCost = watch('shippingCost')
  const otherCost = watch('otherCost')

  // Fetch products from the server using Axios
  const fetchProductsOptions = async () => {
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
    // calculate total cost
    const totalPurchasedCost = cart.reduce(
      (prev, current) => prev + parseFloat(current.sellingPrice) * parseInt(current.quantity),
      0,
    )
    setGrandTotal(totalPurchasedCost)

    fetchProductsOptions()
  }, [cart, grandTotal])

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product)
  }

  const handleBuyingPrice = (e) => {
    setBuyingPrice(parseFloat(e.target.value))
  }

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  const handleAddToCart = () => {
    setCart((prev) => [
      ...prev,
      {
        product: { _id: selectedProduct?.value, name: selectedProduct?.label },
        sellingPrice,
        quantity,
      },
    ])

    //Reset the fields
    setSelectedProduct(null)
    setBuyingPrice(0)
    setQuantity(0)
  }

  const handleRemoveProduct = (productId) => {
    const remainingProducts = cart.filter((pd) => pd.product._id !== productId)
    setCart(remainingProducts)
  }

  const onSubmit = (data) => {
    const newData = {
      vatTax,
      shippingCost,
      otherCost,
      grandTotal: grandTotal + vatTax + shippingCost,
      otherCost,
      products: cart,
    }
    console.log(newData)
  }

  return (
    <CContainer className="bg-white p-4">
      <h2>{grandTotal}</h2>
      <CRow className="border">
        <CCol md={3}>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <label className="my-2 fw-semibold">Vat Tax</label>
            <CFormInput
              type="number"
              name="vatTax"
              min={0}
              {...register('vatTax', {
                required: true,
                valueAsNumber: true,
              })}
            />
            <label className="my-2 fw-semibold">Shipping Cost</label>
            <CFormInput
              type="number"
              name="shippingCost"
              min={0}
              {...register('shippingCost', {
                required: true,
                valueAsNumber: true,
              })}
            />
            <label className="my-2 fw-semibold">Other Cost ( if any )</label>
            <CFormInput
              type="number"
              name="otherCost"
              min={0}
              {...register('otherCost', {
                required: true,
                valueAsNumber: true,
              })}
            />
            <label className="my-2 fw-semibold">Grand Total </label>
            <CFormInput
              type="number"
              name="grandTotal"
              min={0}
              value={grandTotal + vatTax + shippingCost + otherCost}
              {...register('grandTotal', {
                required: true,
                valueAsNumber: true,
              })}
            />
            <CButton type="submit" disabled={!cart.length} size="sm" className="my-4 ">
              Submit
            </CButton>
          </CForm>
        </CCol>

        {/* Add To Cart  */}
        <CCol md={9} className="">
          <CRow>
            <CCol md={6}>
              <label className="my-2 fw-semibold">Select Product </label>
              <Select
                value={selectedProduct}
                isLoading={isLoading}
                isSearchable={isSearchable}
                name="product"
                options={productOptions}
                onChange={handleSelectedProduct}
              />
            </CCol>

            <CCol md={2}>
              <label className="my-2 fw-semibold">Selling Price</label>
              <CFormInput
                type="number"
                name="sellingPrice"
                min={0}
                value={sellingPrice}
                onChange={handleBuyingPrice}
              />
            </CCol>

            <CCol md={2}>
              <label className="my-2 fw-semibold">Quantity</label>
              <CFormInput
                type="number"
                name="quantity"
                min={0}
                value={quantity}
                onChange={handleQuantity}
              />
            </CCol>
            <CCol md={2} className="my-4 ">
              <CButton
                type="button"
                className="mx-2"
                disabled={!selectedProduct?.label || !sellingPrice > 0 || !quantity}
                onClick={handleAddToCart}
              >
                Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 ms-1">
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Product name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Selling Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {cart.map((product, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>{product?.product?.name}</CTableDataCell>
                    <CTableDataCell>{product?.sellingPrice}</CTableDataCell>
                    <CTableDataCell>{product?.quantity}</CTableDataCell>
                    <CTableDataCell>{product?.sellingPrice * product?.quantity}</CTableDataCell>
                    <CTableDataCell>
                      <AiFillDelete
                        className="cursor-pointer"
                        onClick={() => handleRemoveProduct(product?.product?._id)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default PurchaseForm
