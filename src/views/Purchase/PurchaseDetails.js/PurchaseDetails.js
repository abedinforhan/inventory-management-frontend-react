import { CCol, CContainer, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import InvoiceTable from 'src/components/IMTables/InvoiceTable'
import Loading from 'src/components/Loading/Loading'
import { useAuth } from 'src/hooks/useAuth'
import { useSinglePurchaseData } from 'src/hooks/usePurchasesData'
import { useSingleUserData } from 'src/hooks/useUser'
import formateDate from 'src/utils/formatDate'

const PurchaseDetails = () => {
  const { purchaseId } = useParams()
  const {
    user: { userId },
  } = useAuth()

  // fetching user data from server
  const { isLoading: isUserLoading, data: userData } = useSingleUserData(userId)
  // fetching purchase data from server
  const { isLoading, isError, data: purchaseData } = useSinglePurchaseData(purchaseId)

  const { _id, supplier, vatTax, shippingCost, otherCost, grandTotal } = purchaseData || {}

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
          <p>Amiri Inventory</p>
        </CCol>
      </CRow>
      <CRow className="my-2" md={{ gutterY: 2 }}>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill From</h5>
          <p>
            {supplier?.name} <br />
            <small>Jamal Khan Road, Chattogram </small>
          </p>
        </CCol>
        <CCol md={6}>
          <h5 className="fw-semibold">Bill To</h5>
          <p>
            Mezbaul Abedin <br />
            <small>Jamal Khan Road, Chattogram </small>
          </p>
        </CCol>

        <CCol md={6}>
          <h5 className="fw-semibold">Issued on</h5>
          <p> {formateDate(purchaseData.createdAt)}</p>
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
            data={purchaseData.products}
            columns={columns}
          />
        </CCol>
      </CRow>
      <CRow></CRow>
    </CContainer>
  )
}

export default PurchaseDetails
