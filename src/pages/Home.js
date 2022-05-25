import React, { useEffect } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBSpinner,
  MDBTypography,
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { getTours, setCurrentPage } from '../redux/features/tourSlice.js'
import CardTour from '../components/CardTour.js'
import Spinner from '../components/Spinner.js'
import Pagination from '../components/Pagination.js'
import HomeCarousal from '../components/HomeCarousal.js'
import Footer from '../components/Footer.js'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const searchQuery = query.get('searchQuery')
  const location = useLocation()

  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    }),
  )

  useEffect(() => {
    dispatch(getTours(currentPage))
  }, [currentPage])

  if (loading) {
    return <Spinner />
  }

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && location.pathname === '/' && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}

        {tours.length === 0 && location.pathname !== '/' && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item, index) => (
                  <CardTour key={index} {...item}></CardTour>
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
      <HomeCarousal />
      <Footer />
    </div>
  )
}

export default Home
