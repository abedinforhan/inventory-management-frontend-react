import React, { useEffect, useState } from 'react'
import { CCol, CContainer, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { BsFilterSquareFill } from 'react-icons/bs'
import InventoryTable from 'src/components/Table/InventoryTable'
import { MdEdit } from 'react-icons/md'
import EditCategoryModal from '../EditCategory/EditCategoryModal'
import toast, { Toaster } from 'react-hot-toast'
import axiosInstance from 'src/api/axiosInstance'
import { API_ENDPOINTS } from 'src/api/endPoints'

const CategoryList = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [editedData, setEditedData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  let categoryUrl = API_ENDPOINTS.get_categories

  // Fetching categories dropdown
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(categoryUrl)
      const categories = response.data.data.data
      const options = categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
      const newOptions = [{ label: 'Select Category', value: '' }, ...options]
      setCategoryOptions(newOptions)
    } catch (error) {
      console.error('Error fetching category options:', error)
    }
  }

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

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchText('')
    setSelectedCategory('')
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

  // Fetching Data
  const fetchData = async () => {
    try {
      let params = {}

      if (searchText) {
        params.searchTerm = searchText
      }

      if (selectedCategory) {
        params._id = selectedCategory
      }

      if (currentPage) {
        params.page = currentPage
      }
      if (pageSize) {
        params.limit = pageSize
      }

      const response = await axiosInstance.get(categoryUrl, { params })
      setData(response.data.data.data)
      setTotalPages(Math.ceil(Number(response.data.data.meta.total / pageSize)))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Table Columns
  const columnDefs = [
    { headerName: 'Name', field: 'name', flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: ({ data }) => (
        <MdEdit onClick={() => handleEdit(data)} style={{ cursor: 'pointer' }} />
      ),
      flex: 1,
    },
  ]

  // Page Size Options
  const pageSizeOptions = [5, 10, 20]

  useEffect(() => {
    fetchData()
    fetchCategories()
  }, [searchText, selectedCategory, pageSize, currentPage, editedData])

  return (
    <CContainer className="mb-5">
      <div className="search-filter-container">
        <CRow className="mb-4">
          {/* Search Input */}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              label="Search Category"
              autoComplete="off"
              value={searchText}
              placeholder="Search category..."
              onChange={handleSearch}
            />
          </CCol>

          {/* Filter Dropdown */}
          <CCol>
            <CFormLabel htmlFor="categoryName">Select Category</CFormLabel>
            <CRow>
              <CCol md={10}>
                <CFormSelect
                  id="categoryName"
                  value={selectedCategory}
                  onChange={handleSelectCategory}
                  options={categoryOptions}
                />
              </CCol>
              <CCol className="pe-auto">
                <BsFilterSquareFill size={24} onClick={handleClearFilters} />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </div>

      {/* Table to show data */}
      <InventoryTable
        columnDefs={columnDefs}
        rowData={data}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        openModal={openModal}
      />

      {/* Show Edited Data Into Modal */}
      <EditCategoryModal
        editedData={editedData}
        onClearEditedData={handleClearEditedData}
        isOpen={isModalOpen}
        closeModal={closeModal}
        toast={toast}
      />

      {/* Show Toast */}
      <Toaster position="top-center" reverseOrder={false} />
    </CContainer>
  )
}

export default CategoryList
