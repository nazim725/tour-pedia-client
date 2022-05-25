import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
// login operation------------start
export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue)
      toast.success('Login Successfully')
      navigate('/')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// login operation-----------end
// signup operation------------start
export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signup(formValue)
      toast.success('Register Successfully')
      navigate('/')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// signup operation-----------end
// google signIn operation------------start
export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result)
      toast.success('Google Sign-in Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
//  google signin  operation-----------end

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      //login korar por information save korbe
      state.user = action.payload
    },
    setLogout: (state, action) => {
      //logout korar por user=null hbe.
      state.user = null
      localStorage.clear() //logout korar por local storage empty hbe
    },
  },
  extraReducers: {
    //   for login ----------------start
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // for login end---------------------end
    //  for register ----------------start
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // for register end---------------------end
    //  googleSignIn  ----------------start
    [googleSignIn.pending]: (state, action) => {
      state.loading = true
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // googleSignIn end---------------------end
  },
})

export const { setUser, setLogout } = authSlice.actions //reducers ghula export korte hoi ai vhabe

export default authSlice.reducer
