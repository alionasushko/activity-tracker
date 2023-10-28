import * as yup from 'yup'

const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const YupValidation = yup.object().shape({
  name: yup.string().min(3, 'Name is too short').max(30, 'Name is too long').required('Name is required'),

  email: yup.string().email('Invalid email address').required('Email is required'),

  password: yup
    .string()
    .required('Enter Your Password')
    .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
    .min(8, 'Password Should be minimum 8 character')
    .max(50, 'Too long'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not matched')
    .required('Confirm Password is Required'),
})

export default YupValidation
