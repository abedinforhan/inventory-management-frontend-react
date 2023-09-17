import { CContainer, CSpinner } from '@coreui/react'

const Loading = () => {
  return (
    <CContainer
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <CSpinner color="primary" />
    </CContainer>
  )
}

export default Loading
