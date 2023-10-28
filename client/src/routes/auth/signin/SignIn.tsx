import { useNavigate } from 'react-router-dom'
import { Form, Formik, ErrorMessage } from 'formik'
import { useAppDispatch } from '../../../store/hooks'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { loginUserAsync } from '../../../store/userSlice'
import { UserLoginData } from '../../../types/user'
import YupValidation from './yupValidation'

const initialLoginData = {
  email: '',
  password: '',
}

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignin = async (values: UserLoginData): Promise<any> => {
    const result = await dispatch(loginUserAsync(values)).unwrap()
    if (result.status === 'success') {
      navigate('/')
    }
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
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            onSubmit={handleSignin}
            initialValues={initialLoginData}
            validationSchema={YupValidation}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, handleSubmit, handleChange, handleBlur }) => {
              return (
                <Form>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="email" />}
                    error={errors.email ? touched.email : undefined}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="password" />}
                    error={errors.password ? touched.password : undefined}
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                </Form>
              )
            }}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
