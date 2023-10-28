import * as yup from 'yup'

const YupValidation = yup.object().shape({
  name: yup.string().min(3, 'Name is too short').max(30, 'Name is too long').required('Name is required'),

  location: yup.string(),

  notes: yup.string(),

  start: yup.date().nullable().required('Start date is required'),

  end: yup.date().nullable().required('End date is required'),
})

export default YupValidation
