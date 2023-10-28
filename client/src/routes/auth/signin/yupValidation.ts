import * as yup from 'yup'

const YupValidation = yup.object().shape({
  email: yup.string().required('Email is required'),

  password: yup.string().required('Password is required'),
})

export default YupValidation
