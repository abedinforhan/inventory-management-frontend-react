import React, { useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'

import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import { useDebouncedSearch } from 'src/hooks/useDebouncedSearch'
import { useNavigate } from 'react-router-dom'

import { useSuppliersData } from 'src/hooks/useSuppliers'
import DeleteSupplierModel from './DeleteSupplierModel'
import Loading from 'src/components/Loading/Loading'

function SupplierList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [deletedSupplierId, setDeletedSupplierId] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // navigation
  const navigate = useNavigate()

  //deboucing search
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 100)

  // fetching products data
  const {
    isLoading,
    isError,
    data: suppliersData,
  } = useSuppliersData(currentPage, pageSize, debouncedSearchTerm)

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

  const handleEditedData = (productId) => {
    navigate(`/products/edit-product/${productId}`)
  }

  const handleDeleteData = (supplierId) => {
    setDeletedSupplierId(supplierId)
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
      header: 'Gender',
      accessorKey: 'gender',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Brand',
      accessorKey: 'brand.name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Contact No',
      accessorKey: 'contactNo',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Emergency Contact No',
      accessorKey: 'emergencyContactNo',
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
            data={suppliersData?.data}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPage={suppliersData?.meta?.totalPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </CCol>
      </CRow>
      <DeleteSupplierModel
        deletedSupplierId={deletedSupplierId}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default SupplierList
