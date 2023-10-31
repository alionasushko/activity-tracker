import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RootState } from './store'
import { IUser, UserRegisterData, UserLoginData } from '../types/user'
import { setToken, removeToken, setAccount, getAccount, removeAccount } from '../utils/auth'
import { request } from '../api/config'

const initialState: IUser = {
  status: 'idle',
  account: null,
  accessToken: '',
}

export const registerUserAsync = createAsyncThunk('post/registerUser', async (formData: UserRegisterData) => {
  return await request({ method: 'POST', url: '/auth/register', data: formData })
})

export const loginUserAsync = createAsyncThunk('post/loginUser', async (formData: UserLoginData) => {
  const data = await request({ method: 'POST', url: '/auth/login', data: formData })
  setToken(data.access_token)
  return data
})

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
  const res = await request({ method: 'GET', url: '/auth/logout' })
  if (res.status === 'success') {
    removeToken()
    removeAccount()
  }
})

export const getUserCredentialsAsync = createAsyncThunk<AxiosResponse, void, { state: RootState }>(
  'post/getUserCredentials',
  async () => {
    const savedAccount = getAccount()
    if (savedAccount) return JSON.parse(savedAccount)
    const data = await request({ method: 'GET', url: '/users/me' })
    setAccount(data.data.user)
    return data
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.account = action.payload.data.user
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.accessToken = action.payload.access_token
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(getUserCredentialsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserCredentialsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.account = action.payload.data?.user || action.payload
      })
      .addCase(getUserCredentialsAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle'
        state.account = null
        state.accessToken = ''
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectAccount = (state: RootState) => state.user.account
export const selectUserStatus = (state: RootState) => state.user.status

export default userSlice.reducer
