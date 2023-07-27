import { CCol, CContainer, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/api/axiosInstance'
import { API_ENDPOINTS } from 'src/api/endPoints'
import { BsFilterSquareFill } from 'react-icons/bs'
import InventoryTable from 'src/components/Table/InventoryTable'
import { MdEdit } from 'react-icons/md'
import './BrandList.css'
import EditBrandModal from '../EditBrand/EditBrandModal'
import toast, { Toaster } from 'react-hot-toast'

const BrandList = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [brandOptions, setBrandOptions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [editedData, setEditedData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  let brandUrl = API_ENDPOINTS.get_brands
  // Fetching brands dropodown
  const fetchBrandOptions = async () => {
    try {
      const response = await axiosInstance.get(brandUrl)
      const brands = response.data.data.data
      const options = brands.map((brand) => ({ label: brand.name, value: brand.id }))
      const newOptions = [{ label: 'Select Brand ', value: '' }, ...options]
      setBrandOptions(newOptions)
    } catch (error) {
      console.error('Error fetching brand options:', error)
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

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchText('')
    setSelectedBrand('')
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
  const fetchData = async () => {
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

      const response = await axiosInstance.get(brandUrl, { params })
      setData(response.data.data.data)
      setTotalPages(Math.ceil(Number(response.data.data.meta.total / pageSize)))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Table Columns
  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description', flex: 2 },
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
    fetchData()
    fetchBrandOptions()
  }, [searchText, selectedBrand, pageSize, currentPage, editedData])

  return (
    <CContainer className="mb-5">
      <div className="search-filter-container">
        <CRow className="mb-4">
          {/* Search Input */}
          <CCol md={6}>
            <CFormInput
              type="text"
              id="name"
              label="Search Brand"
              autoComplete="off"
              value={searchText}
              placeholder="Search brand..."
              onChange={handleSearch}
            />
          </CCol>

          {/* Filter Dropdown */}
          <CCol>
            <CFormLabel htmlFor="brandName">Select Brand</CFormLabel>
            <CRow>
              <CCol md={10}>
                <CFormSelect
                  id="brandName"
                  value={selectedBrand}
                  onChange={handleSelectBrand}
                  options={brandOptions}
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
      <EditBrandModal
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

export default BrandList
