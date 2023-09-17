// import { cilArrowCircleTop, cilCalendarCheck, cilCart, cilDescription } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import { CCol, CContainer, CRow } from '@coreui/react'
// import { useSummaries } from 'src/hooks/useSummary'
// const Dashboard = () => {
//   const { isLoading, isError, data: summaryData } = useSummaries()

//   const {
//     totalPurchase = 0,
//     totalSales = 0,
//     totalPurchasedProduct = 0,
//     totalSalesProduct = 0,
//     profitLoss = 0,
//     totalPurchaseInvoices = 0,
//     totalSaleInvoices = 0,
//     totalCustomer = 0,
//     totalSupplier = 0,
//   } = summaryData?.data?.data || {}

//   return (
//     <CContainer>
//       <CRow className="mb-4">
//         <CCol md={4}>
//           <div className="border d-flex justify-content-evenly p-5 bg-purchase">
//             <CIcon size="xxl" icon={cilCalendarCheck} />
//             <div>
//               <h6>Tk. {totalPurchase} </h6>
//               <p>Total purchase</p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={4}>
//           <div className="border d-flex justify-content-evenly p-5 bg-sales ">
//             <CIcon size="xxl" icon={cilCart} />
//             <div>
//               <h6>Tk. {totalSales} </h6>
//               <p>Total Sales</p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={4}>
//           <div className="border d-flex justify-content-evenly p-5 bg-total ">
//             <CIcon size="xxl" icon={cilArrowCircleTop} />
//             <div>
//               <h6>Tk. {profitLoss} </h6>
//               <p>Total {profitLoss >= 0 ? 'profit' : 'Loss'}</p>
//             </div>
//           </div>
//         </CCol>
//       </CRow>

//       <CRow>
//         <CCol md={3} className="mb-4">
//           <div className="border d-flex justify-content-evenly py-5  bg-purchase-invoice ">
//             <CIcon size="xxl" icon={cilDescription} />
//             <div>
//               <h6>{totalPurchaseInvoices} </h6>
//               <p>Total Purchase Invoice</p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={3}>
//           <div className="border d-flex justify-content-evenly py-5 bg-sales-invoice">
//             <CIcon size="xxl" icon={cilCalendarCheck} />
//             <div>
//               <h6>{totalSaleInvoices} </h6>
//               <p>Total Sales Invoice</p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={3} className="mb-4">
//           <div className="border d-flex justify-content-evenly py-5  bg-purchase-invoice ">
//             <CIcon size="xxl" icon={cilDescription} />
//             <div>
//               <h6>{totalPurchasedProduct} </h6>
//               <p>Total Purchase Products</p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={3} className="mb-4">
//           <div className="border d-flex justify-content-evenly py-5  bg-purchase-invoice ">
//             <CIcon size="xxl" icon={cilDescription} />
//             <div>
//               <h6>{totalSalesProduct} </h6>
//               <p>Total Sale Products</p>
//             </div>
//           </div>
//         </CCol>
//       </CRow>

//       <CRow className="d-flex justify-content-around">
//         <CCol md={6}>
//           <div className="border d-flex justify-content-evenly p-5 bg-total-customer ">
//             <CIcon size="xxl" icon={cilCart} />
//             <div>
//               <h6> {totalCustomer}</h6>
//               <p>Total Customer </p>
//             </div>
//           </div>
//         </CCol>
//         <CCol md={6}>
//           <div className="border d-flex justify-content-evenly p-5 bg-total-customer ">
//             <CIcon size="xxl" icon={cilCart} />
//             <div>
//               <h6> {totalSupplier}</h6>
//               <p>Total Supplier </p>
//             </div>
//           </div>
//         </CCol>
//       </CRow>

//       {/* <CCard className="mb-4">
//         <CCardBody>
//           <CRow>
//             <CCol sm={5}>
//               <h4 id="traffic" className="card-title mb-0">
//                 Traffic
//               </h4>
//               <div className="small text-medium-emphasis">January - July 2021</div>
//             </CCol>
//             <CCol sm={7} className="d-none d-md-block">
//               <CButton color="primary" className="float-end">
//                 <CIcon icon={cilCloudDownload} />
//               </CButton>
//               <CButtonGroup className="float-end me-3">
//                 {['Day', 'Month', 'Year'].map((value) => (
//                   <CButton
//                     color="outline-secondary"
//                     key={value}
//                     className="mx-0"
//                     active={value === 'Month'}
//                   >
//                     {value}
//                   </CButton>
//                 ))}
//               </CButtonGroup>
//             </CCol>
//           </CRow>
//           <CChartLine
//             style={{ height: '300px', marginTop: '40px' }}
//             data={{
//               labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//               datasets: [
//                 {
//                   label: 'My First dataset',
//                   backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
//                   borderColor: getStyle('--cui-info'),
//                   pointHoverBackgroundColor: getStyle('--cui-info'),
//                   borderWidth: 2,
//                   data: [
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                   ],
//                   fill: true,
//                 },
//                 {
//                   label: 'My Second dataset',
//                   backgroundColor: 'transparent',
//                   borderColor: getStyle('--cui-success'),
//                   pointHoverBackgroundColor: getStyle('--cui-success'),
//                   borderWidth: 2,
//                   data: [
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                   ],
//                 },
//                 {
//                   label: 'My Third dataset',
//                   backgroundColor: 'transparent',
//                   borderColor: getStyle('--cui-danger'),
//                   pointHoverBackgroundColor: getStyle('--cui-danger'),
//                   borderWidth: 1,
//                   borderDash: [8, 5],
//                   data: [65, 65, 65, 65, 65, 65, 65],
//                 },
//               ],
//             }}
//             options={{
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   display: false,
//                 },
//               },
//               scales: {
//                 x: {
//                   grid: {
//                     drawOnChartArea: false,
//                   },
//                 },
//                 y: {
//                   ticks: {
//                     beginAtZero: true,
//                     maxTicksLimit: 5,
//                     stepSize: Math.ceil(250 / 5),
//                     max: 250,
//                   },
//                 },
//               },
//               elements: {
//                 line: {
//                   tension: 0.4,
//                 },
//                 point: {
//                   radius: 0,
//                   hitRadius: 10,
//                   hoverRadius: 4,
//                   hoverBorderWidth: 3,
//                 },
//               },
//             }}
//           />
//         </CCardBody>
//       </CCard> */}
//     </CContainer>
//   )
// }

// export default Dashboard

import {
  cilArrowCircleTop,
  cilCalendarCheck,
  cilCart,
  cilDescription,
  cilPeople,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CContainer, CRow } from '@coreui/react'
import Loading from 'src/components/Loading/Loading'
import { useSummaries } from 'src/hooks/useSummary'

const Dashboard = () => {
  const { isLoading, isError, data: summaryData } = useSummaries()

  const {
    totalPurchaseAmount,
    totalSaleAmount,
    totalPurchasedProduct,
    totalSalesProduct,
    profitLoss,
    totalPurchaseInvoices,
    totalSaleInvoices,
    totalCustomer,
    totalSupplier,
  } = summaryData?.data?.data || {}

  if (isLoading) {
    return <Loading />
  }

  return (
    <CContainer>
      <CRow className="mb-4">
        <CCol md={4}>
          <div className="border d-flex justify-content-evenly p-5 bg-card bg-purchase">
            <CIcon size="xxl" icon={cilCalendarCheck} />
            <div>
              <h6>Tk. {totalPurchaseAmount} </h6>
              <p>Total purchase</p>
            </div>
          </div>
        </CCol>
        <CCol md={4}>
          <div className="border d-flex justify-content-evenly p-5 bg-card bg-sales">
            <CIcon size="xxl" icon={cilCart} />
            <div>
              <h6>Tk. {totalSaleAmount} </h6>
              <p>Total Sales</p>
            </div>
          </div>
        </CCol>
        <CCol md={4}>
          <div className="border d-flex justify-content-evenly p-5 bg-card bg-profit">
            <CIcon size="xxl" icon={cilArrowCircleTop} />
            <div>
              <h6>Tk. {profitLoss} </h6>
              <p>Total {profitLoss >= 0 ? 'profit' : 'Loss'}</p>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={3} className="mb-4">
          <div className="border d-flex justify-content-evenly py-5 bg-card bg-purchase-invoice">
            <CIcon size="xxl" icon={cilDescription} />
            <div>
              <h6>{totalPurchaseInvoices} </h6>
              <p>Total Purchase Invoice</p>
            </div>
          </div>
        </CCol>
        <CCol md={3}>
          <div className="border d-flex justify-content-evenly py-5 bg-card bg-sales-invoice">
            <CIcon size="xxl" icon={cilCalendarCheck} />
            <div>
              <h6>{totalSaleInvoices} </h6>
              <p>Total Sales Invoice</p>
            </div>
          </div>
        </CCol>
        <CCol md={3} className="mb-4">
          <div className="border d-flex justify-content-evenly py-5 bg-card bg-purchased-product">
            <CIcon size="xxl" icon={cilDescription} />
            <div>
              <h6>{totalPurchasedProduct} </h6>
              <p>Total Purchase Products</p>
            </div>
          </div>
        </CCol>
        <CCol md={3} className="mb-4">
          <div className="border d-flex justify-content-evenly py-5 bg-card bg-sale-products">
            <CIcon size="xxl" icon={cilDescription} />
            <div>
              <h6>{totalSalesProduct} </h6>
              <p>Total Sale Products</p>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="d-flex justify-content-around">
        <CCol md={6}>
          <div className="border d-flex justify-content-evenly p-5 bg-card bg-total-customer">
            <CIcon size="xxl" icon={cilPeople} />
            <div>
              <h6> {totalCustomer}</h6>
              <h5>Total Customer </h5>
            </div>
          </div>
        </CCol>
        <CCol md={6}>
          <div className="border d-flex justify-content-evenly p-5 bg-card bg-total-supplier">
            <CIcon size="xxl" icon={cilPeople} />
            <div>
              <h6> {totalSupplier}</h6>
              <h5>Total Supplier </h5>
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
