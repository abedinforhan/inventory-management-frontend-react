import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/API/axiosInstance'
import { API_ENDPOINTS } from 'src/API/URL'

import { MdEdit } from 'react-icons/md'
import { Toaster } from 'react-hot-toast'

const PurchaseList = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [editedData, setEditedData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const productURL = API_ENDPOINTS.get_products

  // Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  // Searching & Filtering
  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  // Modal Open & Close
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Editing Data
  const handleEdit = (item) => {
    setEditedData(item)
    openModal()
  }
  // Clear Edited Data
  const handleClearEditedData = () => {
    setEditedData('')
  }

  // Deleting Data
  const handleDelete = (item) => {
    setEditedData(item)
  }

  // Fetching Data
  const fetchProducts = async () => {
    try {
      let params = {}

      if (searchText) {
        params.searchTerm = searchText
      }

      if (selectedBrand) {
        params._id = selectedBrand
      }

      if (currentPage) {
        params.page = currentPage
      }
      if (pageSize) {
        params.limit = pageSize
      }

      const response = await axiosInstance.get(productURL, { params })
      setData(response.data.data.data)
      setTotalPages(Math.ceil(Number(response.data.data.meta.total / pageSize)))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Table Columns
  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Category', field: 'category.name', flex: 2 },
    { headerName: 'Brand', field: 'brand.name', flex: 2 },

    {
      headerName: 'Actions',
      cellRenderer: ({ data }) => (
        <MdEdit onClick={() => handleEdit(data)} style={{ cursor: 'pointer' }} />
      ),
    },
  ]

  // Page Size Options
  const pageSizeOptions = [5, 10, 20]

  useEffect(() => {
    fetchProducts()
  }, [searchText, pageSize, currentPage, editedData])

  return (
    <CContainer className="mb-5">
      <div className="search-filter-container">
        <CRow className="mb-4">
          {/* Search Input */}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              label="Search Product"
              autoComplete="off"
              value={searchText}
              placeholder="Search Product..."
              onChange={handleSearch}
            />
          </CCol>
        </CRow>
      </div>

      {/* Table to show data */}

      {/* <InventoryTable
        columnDefs={columnDefs}
        rowData={data}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        openModal={openModal}
      /> */}
      {/* Show Edited Data Into Modal */}

      {/* Show Toast */}
      <Toaster position="top-center" reverseOrder={false} />
    </CContainer>
  )
}

export default PurchaseList
