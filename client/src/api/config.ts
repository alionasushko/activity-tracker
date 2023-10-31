import axios, { AxiosResponse } from 'axios'
import { getToken, removeAccount, removeToken, setToken } from '../utils/auth'
import { toast } from 'react-toastify'

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

const refreshAccessToken = async () => {
  try {
    const response = await axiosApiInstance.get(process.env.REACT_APP_API_URL + '/auth/refres')
    return response.data.access_token
  } catch (error) {
    removeToken()
    removeAccount()
    const message = getErrorMessage(error)
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: true,
    })
  }
}

const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data.error ||
    error?.response?.data ||
    error?.message ||
    error.toString()
  )
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = getToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await refreshAccessToken()
      setToken(access_token)
      axiosApiInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
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
    const message = getErrorMessage(error)
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: true,
    })
    throw new Error(error)
  }
}

export default axiosApiInstance
