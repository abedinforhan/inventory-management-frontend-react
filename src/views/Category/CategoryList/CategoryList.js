import React, { useEffect, useState } from 'react'
import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'

import axiosInstance from 'src/api/axios'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal'
import { Toaster, toast } from 'react-hot-toast'
import DeleteCategoryModel from '../DeleteCategoryModal/DeleteCategoryModal'

function CategoryList() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [editableData, setEditableData] = useState('')
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  // Searching
  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  const handleEditedData = (data) => {
    setEditableData(data)
    setIsEditModalVisible(true)
  }

  const handleDeleteData = (data) => {
    setEditableData(data)
    setIsDeleteModalVisible(true)
  }

  // Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {}

        if (searchText) {
          params.searchTerm = searchText
        }

        if (currentPage) {
          params.page = currentPage
        }
        if (pageSize) {
          params.limit = pageSize
        }

        const response = await axiosInstance.get('categories', { params })
        setData(response.data.data.data)
        setTotalPages(Math.ceil(Number(response.data.data.meta.total / pageSize)))
      } catch (error) {
        toast.error('Failed to load data')
      }
    }

    fetchData()
  }, [searchText, pageSize, currentPage, isEditModalVisible, isDeleteModalVisible])

  // Table headers
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: ({ row }) => (
        <div className="d-flex">
          <p className="mouse-pointer ">
            <AiOutlineEdit onClick={() => handleEditedData(row.original)} size={24} />
          </p>
          <p className="mouse-pointer ">
            <AiOutlineDelete onClick={() => handleDeleteData(row.original)} size={24} />
          </p>
        </div>
      ),
    },
  ]

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
      </CRow>
      <CRow className="mt-4">
        <CCol md={12}>
          <IMPaginatedTable
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
      <EditCategoryModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        editableData={editableData}
        setEditableData={setEditableData}
      />
      <DeleteCategoryModel
        editableData={editableData}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default CategoryList
