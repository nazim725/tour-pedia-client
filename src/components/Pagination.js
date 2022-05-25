import React from 'react'
import { MDBPagination, MDBPaginationItem, MDBBtn } from 'mdb-react-ui-kit'

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null //jodi 6 tours or less then 6 tours hoi tobe pagination show korabo na
    if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <p className="fw-bold mt-1">1</p>
            {/* <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn> */}
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              prev
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }
  return <div className="mt-4">{renderPagination()}</div>
}

export default Pagination
