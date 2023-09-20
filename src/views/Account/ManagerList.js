import { CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import axiosInstance from 'src/api/axios'
import IMPaginatedTable from 'src/components/IMTables/IMPaginatedTable'
import Loading from 'src/components/Loading/Loading'
import { useUserStatusOptions } from 'src/hooks/useUserStatusOptions'

function ManagerList() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [editableData, setEditableData] = useState('')
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const statusOptions = useUserStatusOptions()

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

  const handleUpdateStatus = async (userId, option) => {
    try {
      const response = await axiosInstance.patch(`users/${userId}`, {
        status: option.value,
      })
    } catch (error) {
      console.log(error)
    }
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

        const response = await axiosInstance.get('users', { params })
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
      header: 'Gender',
      accessorKey: 'gender',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Contact ',
      accessorKey: 'contactNo',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Emergency Contact',
      accessorKey: 'emergencyContactNo',
      cell: (info) => info.getValue(),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Select
          name="unit"
          defaultValue={[{ label: row?.original?.status, value: row?.original?.status }]}
          placeholder="Select unit"
          onChange={(option) => handleUpdateStatus(row?.original?._id, option)}
          options={statusOptions}
        />
      ),
    },
    // {
    //   header: () => <span className="d-flex justify-content-end ">Actions</span>,
    //   accessorKey: 'id',
    //   cell: ({ row }) => (
    //     <div className="d-flex justify-content-end ">
    //       <p className="mouse-pointer ">
    //         <AiOutlineEdit onClick={() => handleEditedData(row.original)} size={24} />
    //       </p>
    //       <p className="mouse-pointer ">
    //         <AiOutlineDelete onClick={() => handleDeleteData(row.original)} size={24} />
    //       </p>
    //     </div>
    //   ),
    // },
  ]

  if (!data.length) {
    return <Loading />
  }

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
      {/* <EditCategoryModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        editableData={editableData}
        setEditableData={setEditableData}
      />
      <DeleteCategoryModel
        editableData={editableData}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      /> */}
      <Toaster position="bottom-center" />
    </CContainer>
  )
}

export default ManagerList
