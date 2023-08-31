import React, { useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'
import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import { useDebouncedSearch } from 'src/hooks/useDebouncedSearch'
import { useNavigate } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
import { useCustomersData } from 'src/hooks/useCustomersData'
import DeleteCustomerModel from './DeleteCustomerModel'

function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [deletedCustomerId, setDeletedCustomerId] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // navigation
  const navigate = useNavigate()

  //deboucing search
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 100)

  // fetching customers data
  const {
    isLoading,
    isError,
    data: customersData,
  } = useCustomersData(currentPage, pageSize, debouncedSearchTerm)

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

  const handleEditedData = (customerId) => {
    navigate(`/customers/edit-product/${customerId}`)
  }

  const handleDeleteData = (customerId) => {
    console.log(customerId)
    setDeletedCustomerId(customerId)
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
      header: 'Email',
      accessorKey: 'email',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Contact No',
      accessorKey: 'contactNo',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Street Address',
      accessorKey: 'streetAddress',
      cell: (info) => info.getValue(),
    },
    {
      header: 'city',
      accessorKey: 'city',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Zip Code',
      accessorKey: 'zipCode',
      cell: (info) => info.getValue(),
    },

    {
      header: 'Actions',
      accessorKey: 'id',
      cell: ({ row }) => (
        <div className="d-flex">
          <p className="mouse-pointer ">
            <AiOutlineEdit onClick={() => handleEditedData(row.original.id)} size={24} />
          </p>
          <p className="mouse-pointer ">
            <AiOutlineDelete onClick={() => handleDeleteData(row.original.id)} size={24} />
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
      <CRow>
        <CCol md={6}>
          <label className="my-2 fw-semibold">Select Search</label>
          <CFormInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search... "
          ></CFormInput>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol md={12}>
          <IMPaginatedTable
            data={customersData?.data}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPage={customersData?.meta?.totalPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </CCol>
      </CRow>
      <DeleteCustomerModel
        deletedCustomerId={deletedCustomerId}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default CustomerList
