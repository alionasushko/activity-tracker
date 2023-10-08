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
  name: FormDataEntryValue | null
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
  passwordConfirm: FormDataEntryValue | null
}

export interface UserLoginData {
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}
