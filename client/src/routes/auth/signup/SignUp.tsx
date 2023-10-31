import { Form, Formik, ErrorMessage } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import LoadingButton from '@mui/lab/LoadingButton'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { registerUserAsync, loginUserAsync, selectUserStatus } from '../../../store/userSlice'
import { UserRegisterData } from '../../../types/user'
import YupValidation from './yupValidation'
import { useNavigate } from 'react-router-dom'

const initialRegisterData = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUserStatus)

  const handleSignup = async (values: UserRegisterData) => {
    const res = await dispatch(registerUserAsync(values)).unwrap()
    if (res.status === 'success') {
      await dispatch(loginUserAsync({ email: values.email, password: values.password }))
    }
    navigate('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Formik
            onSubmit={handleSignup}
            initialValues={initialRegisterData}
            validationSchema={YupValidation}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, handleSubmit, handleChange, handleBlur }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        autoComplete="given-name"
                        name="name"
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="name" />}
                        error={errors.name ? touched.name : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="email" />}
                        error={errors.email ? touched.email : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="password" />}
                        error={errors.password ? touched.password : undefined}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirm password"
                        type="password"
                        id="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="passwordConfirm" />}
                        error={errors.passwordConfirm ? touched.passwordConfirm : undefined}
                      />
                    </Grid>
                  </Grid>
                  <LoadingButton
                    type="submit"
                    loading={status === 'loading'}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </LoadingButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
