import { MDBCard, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div
      style={{
        background:
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRPmbQk2mz14aerKhvuMeBebddYcuMDI-lBA&usqp=CAU")',

        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '60px',
      }}
    >
      <MDBRow>
        <MDBCol>
          <div className="ms-5">
            <h5 className="text-primary text-bold fs-2 mt-4 text-start">
              Tour Pedia
            </h5>
            <p className="text-info text-start">tourpedia@gmail.com</p>
            <p className="text-info text-start">++8801830082347</p>
          </div>
        </MDBCol>
        <MDBCol>
          <h3 className="text-primary text-bold mt-4 text-start">Routes</h3>
          <p className="text-info text-start">
            <Link to="/signup">SignUp</Link>
          </p>
          <p className="text-info text-start">
            <Link to="/addTour">Add Tour</Link>
          </p>
          <p className="text-info text-start">
            <Link to="/dashboard">Dashboard</Link>
          </p>
        </MDBCol>
        <MDBCol>
          <h3 className="text-primary text-bold mt-4 text-start">Features</h3>
          <p className="text-info text-start">
            <Link to="/signup">SignUp/Login</Link>
          </p>
          <p className="text-info text-start">
            <Link to="/addTour">Add/remove/edit Tour</Link>
          </p>
          <p className="text-info text-start">
            <Link to="/dashboard">Dashboard</Link>
          </p>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Footer
