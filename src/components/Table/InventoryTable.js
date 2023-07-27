import { AgGridReact } from 'ag-grid-react'

import React from 'react'
import Pagination from 'src/components/pagination.js/Pagination'
import './InventoryTable.css'

const InventoryTable = ({
  columnDefs,
  rowData,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="table-container">
      <div className="ag-theme-alpine" style={{ height: '500px' }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  )
}

export default InventoryTable
