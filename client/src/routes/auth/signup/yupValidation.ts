import * as yup from 'yup'

const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const YupValidation = yup.object().shape({
  name: yup.string().min(3, 'Name is too short').max(30, 'Name is too long').required('Name is required'),

  email: yup.string().email('Invalid email address').required('Email is required'),

  password: yup
    .string()
    .required('Enter Your Password')
    .matches(PasswordRegEx, 'Uppercase, lowercase and special characters are required')
    .min(8, 'Password should be minimum 8 character')
    .max(50, 'Password is too'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not matched')
    .required('Confirm password is required'),
})

export default YupValidation
