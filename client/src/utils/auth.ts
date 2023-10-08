import { IAccount } from '../types/user'

export const getToken = () => {
  return localStorage.getItem('accessToken')
}
export const removeToken = () => {
  localStorage.removeItem('accessToken')
}
export const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const getAccount = () => {
  return localStorage.getItem('account')
}
export const removeAccount = () => {
  localStorage.removeItem('account')
}
export const setAccount = (account: IAccount) => {
  localStorage.setItem('account', JSON.stringify(account))
}
