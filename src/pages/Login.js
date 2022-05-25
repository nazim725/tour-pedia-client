import React, { useState, useEffect } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { googleSignIn, login } from '../redux/features/authSlice'
import { GoogleLogin } from 'react-google-login'
const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formValue, setFormValue] = useState(initialState)
  const { email, password } = formValue
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  const devEnv = process.env.NODE_ENV !== 'production'
  const clientId = devEnv
    ? '449497431701-ih999rvscdkvv0iekfko2sce45a4uig6.apps.googleusercontent.com'
    : '449497431701-88svef5ja2hgl7ua7u4qihe3doub2hiv.apps.googleusercontent.com'

  //

  // jodi error thake thale error dekabe load hower shate shate
  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }))
    }
  }
  const onInputChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email
    const name = resp?.profileObj?.name
    const token = resp?.tokenId
    const googleId = resp?.googleId
    const result = { email, name, token, googleId }
    dispatch(googleSignIn({ result, navigate, toast }))
  }
  const googleFailure = (error) => {
    toast.error(error)
  }
  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5 className="mt-2">Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide Your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please Provide Your Password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: '100%' }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className=" me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <MDBBtn
                style={{ width: '100%' }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          >
            {' '}
          </GoogleLogin>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an Account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Login
