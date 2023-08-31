import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'
import { getCoreRowModel, flexRender, useReactTable } from '@tanstack/react-table'

const InvoiceTable = ({ vatTax, shippingCost, otherCost, grandTotal, data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <CRow>
      <CCol md={12}>
        <CTable borderless>
          <CTableHead className="mb-2 border ">
            {table.getHeaderGroups().map((headerGroup) => (
              <CTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <CTableHeaderCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.id === 'actions' ? 'mx-auto' : ''}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            ))}
          </CTableHead>
          <CTableBody className="">
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
          <CTableBody className=" border-top border-bottom">
            <CTableRow>
              <CTableDataCell className="fw-semibold">Vat Tax</CTableDataCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{vatTax}</CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell className="fw-semibold">Shipping Cost</CTableDataCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{shippingCost}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-semibold">Other Cost</CTableDataCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{otherCost}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-semibold">Grand Total</CTableDataCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell></CTableDataCell>
              <CTableDataCell>{grandTotal}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default InvoiceTable
