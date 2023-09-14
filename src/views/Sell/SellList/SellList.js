import React, { useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { AiOutlineEye } from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'
import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import { useDebouncedSearch } from 'src/hooks/useDebouncedSearch'
import { useNavigate } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
import { usePurchasesData } from 'src/hooks/usePurchasesData'
import { format } from 'date-fns'
import { useSalesData } from 'src/hooks/useSell'

function SupplierList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // navigation
  const navigate = useNavigate()

  //deboucing search
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 100)

  // fetching products data
  const {
    isLoading,
    isError,
    data: purchasedData,
  } = useSalesData(currentPage, pageSize, debouncedSearchTerm)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize)
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleViewSellDetails = (sellId) => {
    navigate(`/sales/${sellId}`)
  }

  // Table headers
  const columns = [
    {
      header: 'Purchase No',
      accessorKey: '_id',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Vat Tax',
      accessorKey: 'vatTax',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Shipping Cost',
      accessorKey: 'shippingCost',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Other Cost',
      accessorKey: 'otherCost',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Grand Total',
      accessorKey: 'grandTotal',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Bought By',
      accessorKey: 'customer.name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info) => {
        const date = new Date(info.getValue())
        const formattedDate = format(date, 'dd/MM/yyyy')
        return formattedDate
      },
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: ({ row }) => (
        <div className="d-flex">
          <p className="mouse-pointer ">
            <AiOutlineEye onClick={() => handleViewSellDetails(row.original.id)} size={24} />
          </p>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h2>Error loading data ...</h2>
  }

  return (
    <CContainer>
      {/* <CRow>
        <CCol md={6}>
          <label className="my-2 fw-semibold">Select Search</label>
          <CFormInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search... "
          ></CFormInput>
        </CCol>
      </CRow> */}
      <CRow className="mt-4">
        <CCol md={12}>
          <IMPaginatedTable
            data={purchasedData?.data}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPage={purchasedData?.meta?.totalPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </CCol>
      </CRow>
      {/* <DeleteSupplierModel
        deletedSupplierId={deletedSupplierId}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      /> */}
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default SupplierList
