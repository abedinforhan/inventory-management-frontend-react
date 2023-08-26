import React, { useEffect, useState } from 'react'
import {
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

const IMTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
    </CContainer>
  )
}

export default IMTable
