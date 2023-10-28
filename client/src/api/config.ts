import axios, { AxiosResponse } from 'axios'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const refreshAccessToken = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL + '/refresh')
  return response.data.access_token
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const token = await refreshAccessToken()
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return axiosApiInstance(originalRequest)
    }
    return Promise.reject(error)
  },
)

interface IRequestParams {
  url: string
  method: string
  data?: any
}

export const request = async ({ url, method, data }: IRequestParams) => {
  method = method || 'GET'
  data = data || null

  try {
    const response: AxiosResponse<any> = await axiosApiInstance({
      method,
      url,
      data,
    })
    return response.data
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data.error ||
      error?.response?.data ||
      error?.message ||
      error.toString()
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: true,
    })
    throw new Error(error)
  }
}

export default axiosApiInstance
