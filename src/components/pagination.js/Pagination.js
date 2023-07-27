import React from 'react'
import { CPaginationItem, CFormSelect, CPagination, CFormLabel } from '@coreui/react'

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}) => {
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value)
    onPageSizeChange(newSize)
  }

  const renderPaginationButtons = () => {
    const buttons = []

    // Add First Page Button
    buttons.push(
      <CPaginationItem
        key="first"
        color="secondary"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="mx-1"
        style={{ cursor: 'pointer' }}
      >
        First
      </CPaginationItem>,
    )

    // Add Four Buttons In Between
    const minButton = Math.max(currentPage - 2, 1)
    const maxButton = Math.min(currentPage + 2, totalPages)
    for (let i = minButton; i <= maxButton; i++) {
      buttons.push(
        <CPaginationItem
          key={i}
          color={i === currentPage ? 'primary' : 'secondary'}
          onClick={() => onPageChange(i)}
          className="mx-1"
          style={{ cursor: 'pointer' }}
        >
          {i}
        </CPaginationItem>,
      )
    }

    // Add Last Page Button
    buttons.push(
      <CPaginationItem
        key="last"
        color="secondary"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="mx-1"
        style={{ cursor: 'pointer' }}
      >
        Last
      </CPaginationItem>,
    )

    return buttons
  }

  return (
    <div className="d-flex align-items-center justify-content-between my-5">
      <CPagination className="mr-auto">{renderPaginationButtons()}</CPagination>
      <div>
        <CFormLabel>Page Size:</CFormLabel>
        <CFormSelect value={pageSize} onChange={handlePageSizeChange} className="ml-2">
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </CFormSelect>
      </div>
    </div>
  )
}

export default Pagination
