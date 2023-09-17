import { CCol, CRow } from '@coreui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import IMTable from 'src/components/IMTables/ImTable'

const PurchasedTable = ({
  cart,
  handleRemoveFromCart,
  totalPurchasedCost,
  vatTax,
  shippingCost,
  otherCost,
}) => {
  const handleDeleteData = (productId) => {
    setDeletedProductId(productId)
    setIsDeleteModalVisible(true)
  }

  // Table headers
  const columns = [
    {
      header: 'Name',
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
      header: 'Qty',
      accessorKey: 'buyingQuantity',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Buying Price',
      accessorKey: 'perUnitBuyingPrice',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Selling Price',
      accessorKey: 'perUnitSellingPrice',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Max Price',
      accessorKey: 'perUnitMaxPrice',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Total Price',
      accessorKey: 'totalBuyingPrice',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Actions',
      accessorKey: 'productId',
      cell: ({ row }) => (
        <p className="mouse-pointer ">
          <AiOutlineDelete onClick={() => handleRemoveFromCart(parseInt(row.id))} size={24} />
        </p>
      ),
    },
  ]

  return (
    <div className="py-5">
      <IMTable data={cart} columns={columns} />
      <CRow className="text-end  fw-semibold me-4" md={{ gutterY: 2 }}>
        <CCol md={12} className="border-bottom">
          Vat Tax : {vatTax}
        </CCol>
        <CCol md={12} className="border-bottom">
          Shipping Cost : {shippingCost}
        </CCol>
        <CCol md={12} className="border-bottom">
          Other Cost : {otherCost}
        </CCol>
        <CCol md={12} className="border-bottom ">
          <h5> Grand Total : {totalPurchasedCost + vatTax + shippingCost + otherCost}</h5>
        </CCol>
      </CRow>
    </div>
  )
}

export default PurchasedTable
