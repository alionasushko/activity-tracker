export interface IAccount {
  name: string
  email: string
}

export interface IUser {
  account?: IAccount | null
  status: 'idle' | 'loading' | 'failed'
  accessToken: string
}

export interface UserRegisterData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface UserLoginData {
  email: string
  password: string
}
