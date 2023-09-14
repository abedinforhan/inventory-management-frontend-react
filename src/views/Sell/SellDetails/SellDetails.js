import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
import { CRow, CCol, CContainer } from '@coreui/react'
import InvoiceTable from 'src/components/IMTables/InvoiceTable'
import { useSingleSellData } from 'src/hooks/useSell'

const SellDetails = () => {
  const { sellId } = useParams()

  const { isLoading, isError, data: sellsData } = useSingleSellData(sellId)

  const { _id, customer, vatTax, shippingCost, otherCost, grandTotal } = sellsData || {}

  // Table headers
  const columns = [
    {
      header: 'Item Name',
      accessorKey: 'name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Brand',
      accessorKey: 'brand',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Unit',
      accessorKey: 'unit',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Buying Price',
      accessorKey: 'perUnitBuyingPrice',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Qty',
      accessorKey: 'buyingQuantity',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Total',
      accessorKey: 'totalBuyingPrice',
      cell: (info) => info.getValue(),
    },
  ]

  if (isLoading) {
    return <Loading />
  }

  return (
    <CContainer>
      <CRow>
        <CCol className="border-bottom">
          <h3 className="fw-semibold">Invoice No # {_id}</h3>
          <p>Persian Store</p>
        </CCol>
      </CRow>
      <CRow className="my-2" md={{ gutterY: 2 }}>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill To</h5>
          <p>
            Mezbaul Abedin <br />
            <small>Jamal Khan Road, Chattogram </small>
          </p>
        </CCol>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill From</h5>
          <p>
            {customer?.name} <br />
            <small>Jamal Khan Road, Chattogram </small>
          </p>
        </CCol>

        <CCol md={6}>
          <h5 className="fw-semibold">Issued on</h5>
          <p> {customer?.name}</p>
        </CCol>
      </CRow>

      <CRow className="my-4">
        <h6>Invoice Detail</h6>
        <CCol md={12} className="my-2">
          <InvoiceTable
            vatTax={vatTax}
            shippingCost={shippingCost}
            otherCost={otherCost}
            grandTotal={grandTotal}
            data={sellsData?.products}
            columns={columns}
          />
        </CCol>
      </CRow>
      <CRow></CRow>
    </CContainer>
  )
}

export default SellDetails
