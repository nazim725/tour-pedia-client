import React from 'react'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'

const HomeCarousal = () => {
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    }),
  )
  console.log(tours)
  return (
    <div className="mt-4">
      <MDBCarousel showControls showIndicators dark fade>
        <MDBCarouselInner>
          <MDBCarouselItem className="active">
            <MDBCarouselElement
              src="https://i.insider.com/58d958617d1fb227008b4c7e?width=1067&format=jpeg"
              alt="..."
            />
          </MDBCarouselItem>

          {tours.map((tour) => (
            <MDBCarouselItem>
              <MDBCarouselElement src={tour.imageFile} alt="..." />
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  )
}

export default HomeCarousal
