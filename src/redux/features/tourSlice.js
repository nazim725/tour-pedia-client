import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
// create tour operation start
export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData)
      toast.success('Tour Added Successfully')
      navigate('/')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
// create tours operation end
// get tour operation start
export const getTours = createAsyncThunk(
  'tour/getTours',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

// get a single  tour operation start
export const getTour = createAsyncThunk(
  'tour/getTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id)
      console.log(response.data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
// get a single  tour operation start
export const getToursByUser = createAsyncThunk(
  'tour/getToursByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId)
      console.log(response.data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
// delete  a single  tour operation start
export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id)
      toast.success('Tour Delete successfully')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
export const updateTour = createAsyncThunk(
  'tour/updateTour',
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id)
      toast.success('Tour Updated Successfully')
      navigate('/')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

// search tour operation
export const searchTours = createAsyncThunk(
  'tour/searchTours',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
export const getToursByTag = createAsyncThunk(
  'tour/getToursByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagTours(tag)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)
export const getRelatedTours = createAsyncThunk(
  'tour/getRelatedTours',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tour: {}, //for storing single tour which will bring from db
    tours: [], //for string all tour which will bring from db
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    loading: false,
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },

  extraReducers: {
    // createAsyncThunk generate 3 promises  pending fulfilled and rejected
    //   for create tour ----------------start
    [createTour.pending]: (state, action) => {
      state.loading = true
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = [action.payload] //data asar por tours a store hbe
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // for create tour  end---------------------end
    //   for get tour ----------------start
    [getTours.pending]: (state, action) => {
      state.loading = true
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = action.payload.data
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action.payload.currentPage
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // for get tour  end---------------------end
    //   for get  a single tour ----------------start
    [getTour.pending]: (state, action) => {
      state.loading = true
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false
      state.tour = action.payload
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    // for get a single tour  end---------------------end
    //   for get specific loggedin user er create kora tours tour ----------------start
    [getToursByUser.pending]: (state, action) => {
      state.loading = true
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userTours = action.payload
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    //   for get specific loggedin user er create kora tours tour ----------------end
    //   for delete specific tour ----------------start
    [deleteTour.pending]: (state, action) => {
      state.loading = true
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false
      console.log('action', action)
      const {
        arg: { id },
      } = action.meta //action.meta theke arg niye arg er modde deleted item er id ta thake
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id) // dashboard theke deletd item remove kora
        state.tours = state.tours.filter((item) => item._id !== id) // home page  theke deletd item remove kora
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    //   for delete specific tour ----------------end
    //   for update specific tour ----------------start
    [deleteTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item,
        )
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item,
        )
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    //   for update specific tour ----------------end
    //   for search  tour ----------------start
    [searchTours.pending]: (state, action) => {
      state.loading = true
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = action.payload
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getToursByTag.pending]: (state, action) => {
      state.loading = true
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false
      state.tagTours = action.payload
    },
    [getToursByTag.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getRelatedTours.pending]: (state, action) => {
      state.loading = true
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false
      state.relatedTours = action.payload
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    //   for search  tour ----------------end
    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg: { _id },
      } = action.meta
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item,
        )
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.error = action.payload.message
    },
  },
})

export const { setCurrentPage } = tourSlice.actions
export default tourSlice.reducer
