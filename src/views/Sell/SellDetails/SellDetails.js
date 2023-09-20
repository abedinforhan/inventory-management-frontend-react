import { CCol, CContainer, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import InvoiceTable from 'src/components/IMTables/InvoiceTable'
import Loading from 'src/components/Loading/Loading'
import { useAuth } from 'src/hooks/useAuth'
import { useSingleSellData } from 'src/hooks/useSell'
import { useSingleUserData } from 'src/hooks/useUser'
import formateDate from 'src/utils/formatDate'

const SellDetails = () => {
  const { sellId } = useParams()
  const {
    user: { userId },
  } = useAuth()

  // fetching user data from server
  const { isLoading: isUserLoading, data: userData } = useSingleUserData(userId)
  // fetching sell data from server
  const { isLoading: isSellLoading, data: sellsData } = useSingleSellData(sellId)

  const { _id, customer, vatTax, shippingCost, shippingAddress, otherCost, grandTotal } =
    sellsData || {}

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

  if (isUserLoading || isSellLoading) {
    return <Loading />
  }

  return (
    <CContainer>
      <CRow>
        <CCol className="border-bottom">
          <h3 className="fw-semibold">Invoice No # {_id}</h3>
          <p className="">Amiri Inventory , Chattogram</p>
        </CCol>
      </CRow>
      <CRow className="my-2" md={{ gutterY: 2 }}>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill From</h5>
          <p>
            {userData?.data?.data?.name} <br />
            <small>230/A,Press Club,Jamal Khan Chattogram</small>
          </p>
        </CCol>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill To</h5>
          <p>
            {customer?.name} <br />
            <small>{shippingAddress} </small>
          </p>
        </CCol>

        <CCol md={6}>
          <h5 className="fw-semibold">Issued on</h5>
          <p> {formateDate(sellsData?.createdAt)}</p>
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
