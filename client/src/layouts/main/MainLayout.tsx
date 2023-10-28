import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { CssBaseline, Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { getToken } from '../../utils/auth'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectAccount, getUserCredentialsAsync, signOutAsync } from '../../store/userSlice'
import logo from '../../assets/images/logo.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import './mainLayout.sass'

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const navigate = useNavigate()
  const accessToken = getToken()

  if (!accessToken) {
    return <Navigate to="signin" />
  }

  useEffect(() => {
    if (accessToken && !account) dispatch(getUserCredentialsAsync())
  }, [])

  const signOut = () => {
    dispatch(signOutAsync())
    navigate('/signin')
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ borderBottom: (theme: any) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <img src={logo} alt="Productivity tracker logo" width={30} className="logo-image" />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Productivity tracker
          </Typography>
          <Button
            variant="outlined"
            endIcon={<LogoutIcon />}
            className="btn-outline-white"
            sx={{ my: 1, mx: 1.5 }}
            onClick={signOut}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" className="app">
        <CssBaseline />
        <Box className="app-container">
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default MainLayout