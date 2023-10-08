import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RootState } from './store'
import { IUser, UserRegisterData, UserLoginData } from '../types/user'
import { registerUser, loginUser, getUserCredentials } from '../api/userAPI'
import { setToken, removeToken, setAccount, getAccount, removeAccount } from '../utils/auth'

const initialState: IUser = {
  status: 'idle',
  account: null,
  accessToken: '',
}

export const registerUserAsync = createAsyncThunk('post/registerUser', async (formData: UserRegisterData) => {
  const response = await registerUser(formData)
  return response.data
})

export const loginUserAsync = createAsyncThunk('post/loginUser', async (formData: UserLoginData) => {
  const loginResponse = await loginUser(formData)
  const accessToken = loginResponse.data.access_token
  setToken(accessToken)
  return loginResponse.data
})

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
  removeToken()
  removeAccount()
})

export const getUserCredentialsAsync = createAsyncThunk<AxiosResponse, void, { state: RootState }>(
  'post/getUserCredentials',
  async () => {
    const savedAccount = getAccount()
    if (savedAccount) return JSON.parse(savedAccount)

    const response = await getUserCredentials()
    const account = response.data.data.user
    setAccount(account)
    return response.data
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAccountData: (state, action) => {
      state.account = action.payload
    },
  },

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
      .addCase(signOutAsync.fulfilled, (state) => {
        state.account = null
        state.accessToken = ''
      })
  },
})

export const selectAccount = (state: RootState) => state.user.account
export const selectUserStatus = (state: RootState) => state.user.status

export const { setAccountData } = userSlice.actions

export default userSlice.reducer
