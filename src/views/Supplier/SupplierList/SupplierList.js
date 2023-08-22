import React, { useEffect, useMemo, useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { API_ENDPOINTS } from 'src/API/URL'
import axiosInstance from 'src/API/axiosInstance'
import { AiFillEye, AiFillEdit } from 'react-icons/ai'

import IMTable from 'src/components/IMTable/IMTable'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

function SupplierList() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedBrand, setSelectedBrand] = useState({ label: '', value: '' })
  const [brandOptions, setBrandOptions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [editedData, setEditedData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  // Redirecting to Edit Supplier Page whwn redirecting

  const naviageteToEditPage = (supplierId) => {
    navigate(`/suppliers/edit-supplier/${supplierId}`)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Brand',
        accessorKey: 'brand.name',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Contact NO',
        accessorKey: 'contactNo',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Emergency NO',
        accessorKey: 'emergencyContactNo',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Actions',
        accessorKey: 'id',
        cell: (info) => (
          <p className="mouse-pointer d-flex align-items-center justify-content-evenly">
            <AiFillEdit onClick={() => naviageteToEditPage(info.getValue())} size={24} />
            <AiFillEye size={24} />
          </p>
        ),
      },
    ],

    [],
  )
  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
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

  const handleSelectBrand = (option) => {
    console.log(option)
    setSelectedBrand(option)
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

  // Fetching brands dropodown
  const fetchBrandOptions = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.get_brands)
      const brands = response.data.data.data
      const options = brands.map((brand) => ({ label: brand.name, value: brand.id }))
      const newOptions = options
      setBrandOptions(newOptions)
    } catch (error) {
      console.error('Error fetching brand options:', error)
    }
  }

  useEffect(() => {
    // Fetching Data
    const fetchData = async () => {
      try {
        let params = {}

        if (searchText) {
          params.searchTerm = searchText
        }

        if (selectedBrand.label) {
          params.brand = selectedBrand.value
        }

        if (currentPage) {
          params.page = currentPage
        }
        if (pageSize) {
          params.limit = pageSize
        }

        const response = await axiosInstance.get('/suppliers', { params })
        setData(response.data.data)
        setTotalPages(Math.ceil(Number(response.data.meta.total / pageSize)))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    fetchBrandOptions()
  }, [searchText, selectedBrand, pageSize, currentPage, editedData])

  return (
    <CContainer>
      <CRow>
        <CCol md={6}>
          <label className="my-2 fw-semibold">Select Search</label>
          <CFormInput
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search... "
          ></CFormInput>
        </CCol>
        <CCol md={6}>
          <label className="my-2 fw-semibold">Select Brand </label>
          <Select
            value={selectedBrand}
            name="brand"
            options={brandOptions}
            onChange={handleSelectBrand}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol md={12}>
          <IMTable
            data={data}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default SupplierList
