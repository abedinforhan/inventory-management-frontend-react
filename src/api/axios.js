import axios from 'axios'
import useRefreshToken from 'src/hooks/useRefreshToken'

const axiosInstance = axios.create({
  baseURL: 'https://inventry-management-backend-bwbv26rxr-abedinforhan.vercel.app/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      const resp = await useRefreshToken()

      console.log(resp)

      // const access_token = resp.response.accessToken

      // addTokenToLocalStorage(access_token)
      // customFetch.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      // return customFetch(originalRequest)
    }
    return Promise.reject(error)
  },
)
export default axiosInstance
