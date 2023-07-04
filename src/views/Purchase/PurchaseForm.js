import React, { useState } from 'react'
import { CForm, CRow, CCol, CFormInput, CFormLabel, CFormSelect, CButton } from '@coreui/react'

const PurchaseForm = () => {
  const [products, setProducts] = useState([
    {
      productName: '',
      brand: '',
      category: '',
      buyingPrice: 0,
      sellingPrice: 0,
      quantity: 0,
    },
  ])
  const [vatTax, setVatTax] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [otherCost, setOtherCost] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const handleProductNameChange = (e, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].productName = e.target.value
    setProducts(updatedProducts)
  }

  const handleBrandChange = (e, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].brand = e.target.value
    setProducts(updatedProducts)
  }

  const handleBuyingPriceChange = (e, index) => {
    const { value } = e.target
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts]
      updatedProducts[index].buyingPrice = parseFloat(value)
      updatedProducts[index].sellingPrice = parseFloat(value) + Math.ceil(parseFloat(value) * 0.3) // Set default selling price to 30% of the buying price
      return updatedProducts
    })
  }

  const handleCategoryChange = (e, index) => {
    const { value } = e.target
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts]
      updatedProducts[index].category = value
      return updatedProducts
    })
  }

  const handleSellingPriceChange = (e, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].sellingPrice = parseFloat(e.target.value)
    setProducts(updatedProducts)
  }

  const handleQuantityChange = (e, index) => {
    const updatedProducts = [...products]
    updatedProducts[index].quantity = parseInt(e.target.value)
    setProducts(updatedProducts)
    updateTotalCost(updatedProducts)
  }

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productName: '',
        brand: '',
        buyingPrice: 0,
        sellingPrice: 0,
        quantity: 0,
      },
    ])
  }

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
    updateTotalCost(updatedProducts)
  }

  const handleVatTaxChange = (e) => {
    setVatTax(parseFloat(e.target.value))
    updateTotalCost(products)
  }

  const handleShippingCostChange = (e) => {
    setShippingCost(parseFloat(e.target.value))
    updateTotalCost(products)
  }

  const handleOtherCostChange = (e) => {
    setOtherCost(parseFloat(e.target.value))
    updateTotalCost(products)
  }

  const updateTotalCost = (updatedProducts) => {
    let cost = 0
    updatedProducts.forEach((product) => {
      const productCost = product.buyingPrice * product.quantity
      if (!isNaN(productCost)) {
        cost += productCost
      }
    })
    cost += vatTax + shippingCost + otherCost
    setTotalCost(cost)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform submission logic here
    const purchase = {
      products: products.filter((product) => product.productName !== ''),
      vatTax: vatTax,
      shippingCost: shippingCost,
      otherCost: otherCost,
      totalCost: totalCost,
    }
    console.log('Purchase:', purchase)
    // Reset form fields after submission if needed
    setProducts([
      {
        productName: '',
        brand: '',
        buyingPrice: 0,
        sellingPrice: 0,
        quantity: 0,
      },
    ])
    setVatTax(0)
    setShippingCost(0)
    setOtherCost(0)
    setTotalCost(0)
  }

  const getProductCost = (product) => {
    return product.buyingPrice * product.quantity
  }

  return (
    <CForm onSubmit={handleSubmit}>
      {products.map((product, index) => (
        <CRow key={index} className="mt-4">
          <CCol xs={3} md={4} className="my-1">
            <CFormLabel htmlFor={`product-name-${index}`}>Product Name:</CFormLabel>
            <CFormInput
              type="text"
              id={`product-name-${index}`}
              required
              value={product.productName}
              onChange={(e) => handleProductNameChange(e, index)}
            />
          </CCol>
          <CCol xs={2} md={4} className="my-1">
            <CFormLabel htmlFor={`brand-${index}`}>Brand:</CFormLabel>
            <CFormSelect
              id={`brand-${index}`}
              value={product.brand}
              onChange={(e) => handleBrandChange(e, index)}
              options={['Brand A', 'Brand B', 'Brand C']}
            />
          </CCol>
          <CCol xs={2} md={4} className="my-1">
            <CFormLabel htmlFor={`category-${index}`}>Category:</CFormLabel>
            <CFormSelect
              id={`category-${index}`}
              value={product.category}
              onChange={(e) => handleCategoryChange(e, index)}
              options={['Category A', 'Category B', 'Category C']}
            />
          </CCol>

          <CCol xs={2} md={4} className="my-1">
            <CFormLabel htmlFor={`buying-price-${index}`}>Buying Price:</CFormLabel>
            <CFormInput
              type="number"
              id={`buying-price-${index}`}
              required
              value={product.buyingPrice}
              onChange={(e) => handleBuyingPriceChange(e, index)}
            />
          </CCol>
          <CCol xs={2} md={4} className="my-1">
            <CFormLabel htmlFor={`selling-price-${index}`}>Selling Price:</CFormLabel>
            <CFormInput
              type="number"
              id={`selling-price-${index}`}
              value={product.sellingPrice}
              onChange={(e) => handleSellingPriceChange(e, index)}
            />
          </CCol>
          <CCol xs={2} md={4} className="my-1">
            <CFormLabel htmlFor={`quantity-${index}`}>Quantity:</CFormLabel>
            <CFormInput
              type="number"
              id={`quantity-${index}`}
              required
              value={product.quantity}
              onChange={(e) => handleQuantityChange(e, index)}
            />
          </CCol>
          <CCol xs={2} className="d-flex align-items-end mt-4">
            {index === products.length - 1 && (
              <CButton color="primary" onClick={handleAddProduct}>
                Add Product
              </CButton>
            )}
            {index !== products.length - 1 && (
              <CButton color="danger" onClick={() => handleRemoveProduct(index)}>
                Remove
              </CButton>
            )}
          </CCol>
        </CRow>
      ))}

      <CRow className="mt-3">
        <CCol xs={2}>
          <CFormLabel htmlFor="vat-tax">VAT Tax:</CFormLabel>
          <CFormInput type="number" id="vat-tax" value={vatTax} onChange={handleVatTaxChange} />
        </CCol>
        <CCol xs={2}>
          <CFormLabel htmlFor="shipping-cost">Shipping Cost:</CFormLabel>
          <CFormInput
            type="number"
            id="shipping-cost"
            value={shippingCost}
            onChange={handleShippingCostChange}
          />
        </CCol>
        <CCol xs={2}>
          <CFormLabel htmlFor="other-cost">Other Cost:</CFormLabel>
          <CFormInput
            type="number"
            id="other-cost"
            value={otherCost}
            onChange={handleOtherCostChange}
          />
        </CCol>
        <CCol xs={2}>
          <CFormLabel>Total Cost:</CFormLabel>
          <CFormInput type="text" readOnly value={totalCost} />
        </CCol>
      </CRow>

      <CRow className="mt-3">
        <CCol>
          <CButton type="submit" color="primary">
            Submit
          </CButton>
        </CCol>
      </CRow>

      <CRow className="mt-5">
        <CCol>
          <h4>Purchase Receipt</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Quantity</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.brand}</td>
                  <td>${product.buyingPrice.toFixed(2)}</td>
                  <td>${product.sellingPrice.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>${getProductCost(product).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  Subtotal:
                </td>
                <td>${totalCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  VAT Tax:
                </td>
                <td>${vatTax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  Shipping Cost:
                </td>
                <td>${shippingCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  Other Cost:
                </td>
                <td>${otherCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  Total Cost:
                </td>
                <td>${(totalCost + vatTax + shippingCost + otherCost).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default PurchaseForm
