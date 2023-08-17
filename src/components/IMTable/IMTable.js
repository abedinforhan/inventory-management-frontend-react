import React from 'react'
import {
  CPaginationItem,
  CFormSelect,
  CPagination,
  CFormLabel,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { getCoreRowModel, ColumnDef, flexRender, useReactTable } from '@tanstack/react-table'

const IMTable = ({
  data,
  columns,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value)
    onPageSizeChange(newSize)
  }

  const pageSizeOptions = [2, 5, 10, 15]

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
    <section>
      <div>
        <CTable hover responsive>
          <CTableHead className="mb-2 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <CTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <CTableHeaderCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            ))}
          </CTableHead>
          <CTableBody className="py-2">
            {table.getRowModel().rows.map((row) => (
              <CTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <CTableDataCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
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
    </section>
  )
}

export default IMTable
