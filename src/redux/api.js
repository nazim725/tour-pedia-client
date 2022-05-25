import axios from 'axios'
//for production

const devEnv = process.env.NODE_ENV !== 'production'
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env
const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
})
//for dev
// const API = axios.create({ baseURL: 'http://localhost:5000' })

// backend e token patanur jonno use hoi
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})
// -------------------------

export const signIn = (formData) => API.post('/users/signIn', formData)
export const signup = (formData) => API.post('/users/signup', formData)
export const googleSignIn = (result) => API.post('/users/googleSignIn', result)
export const createTour = (tourData) => API.post('/tour', tourData)
export const getTours = (page) => API.get(`/tour?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`)
export const deleteTour = (id) => API.delete(`/tour/${id}`)
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData) //updatedTourData dia updated data ta body te patano
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`) // id => user Id not a tour id

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`)
//search quary eta header conponent theke asbe. jeta like search korbe seta
export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`)
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags)
export const likeTour = (id) => API.patch(`/tour/like/${id}`)
