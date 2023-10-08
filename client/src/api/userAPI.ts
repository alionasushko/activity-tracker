import axios, { AxiosResponse } from 'axios'
import { UserRegisterData, UserLoginData } from '../types/user'
import { getToken } from '../utils/auth'

export const registerUser = async (formData: UserRegisterData): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(process.env.REACT_APP_API_URL + '/auth/register', formData)
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}

export const loginUser = async (formData: UserLoginData): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', formData)
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getUserCredentials = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(process.env.REACT_APP_API_URL + '/users/me', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}
