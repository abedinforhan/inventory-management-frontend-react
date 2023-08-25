import React, { useEffect, useState } from 'react'
import {
  CPaginationItem,
  CFormSelect,
  CPagination,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CContainer,
} from '@coreui/react'
import { getCoreRowModel, flexRender, useReactTable } from '@tanstack/react-table'

const IMTable = ({
  data,
  columns,
  currentPage,
  pageSize,
  totalPage,
  handlePageChange,
  handlePageSizeChange,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const pageSizeOptions = [5, 10, 15, 20]

  const renderPaginationButtons = () => {
    const buttons = []

    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <CPaginationItem
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </CPaginationItem>,
      )
    }

    return buttons
  }

  return (
    <CContainer>
      <CRow>
        <CCol md={12}>
          <CTable hover>
            <CTableHead className="mb-2 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <CTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <CTableHeaderCell
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.id === 'actions' ? 'ml-auto' : ''}
                    >
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
                <CTableRow key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <CTableDataCell
                      key={cell.id}
                      className={cell.column.id === 'actions' ? 'ml-auto' : ''}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </CTableDataCell>
                  ))}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      <CRow className="my-4 mouse-pointer">
        <div className="d-flex align-items-center justify-content-between">
          <CPagination className="">
            {renderPaginationButtons()}
            {/* <CPaginationItem disabled={currentPage === 1} onClick={() => handlePreviousPage()}>
              1
            </CPaginationItem>
            <CPaginationItem disabled={currentPage === totalPage} onClick={() => handleNextPage()}>
              2
            </CPaginationItem> */}
          </CPagination>
          <div>
            <CFormSelect
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="ml-2"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </CFormSelect>
          </div>
        </div>
      </CRow>
    </CContainer>
  )
}

export default IMTable
