import React, { useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import { Toaster } from 'react-hot-toast'

import { useProductsData } from 'src/hooks/useProducts'
import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import { useDebouncedSearch } from 'src/hooks/useDebouncedSearch'
import { useNavigate } from 'react-router-dom'
import DeleteProductModel from '../DeleteProductModel/DeleteProductModal'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [deletedProductId, setDeletedProductId] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // navigation
  const navigate = useNavigate()

  //deboucing search
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300)

  // fetching products data
  const {
    isLoading: isEditedDataLoading,
    isError,
    data,
  } = useProductsData(currentPage, pageSize, debouncedSearchTerm)

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
      header: 'SKU',
      accessorKey: 'sku',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Category',
      accessorKey: 'category.name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Brand',
      accessorKey: 'brand.name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Unit',
      accessorKey: 'unit.name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Qty',
      accessorKey: 'buyingQuantity',
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

  if (isEditedDataLoading) {
    return <h2>Loading ... </h2>
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
            data={data.data}
            columns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPage={data?.meta?.totalPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </CCol>
      </CRow>
      <DeleteProductModel
        deletedProductId={deletedProductId}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default ProductList
