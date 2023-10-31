import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate, Link } from 'react-router-dom'
import { CssBaseline, Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { getToken } from '../../utils/auth'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectAccount, getUserCredentialsAsync, signOutAsync, selectUserStatus } from '../../store/userSlice'
import logo from '../../assets/images/logo.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import './mainLayout.sass'
import { LoadingButton } from '@mui/lab'

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const status = useAppSelector(selectUserStatus)
  const navigate = useNavigate()
  const accessToken = getToken()

  useEffect(() => {
    if (accessToken && !account) dispatch(getUserCredentialsAsync())
  }, [])

  const signOut = () => {
    dispatch(signOutAsync())
    navigate('/signin')
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ borderBottom: (theme: any) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Link to="/">
            <img src={logo} alt="Productivity tracker logo" width={30} className="logo-image" />
          </Link>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Productivity tracker
          </Typography>
          <Button
            variant="outlined"
            endIcon={<QueryStatsIcon />}
            href="/statistics"
            className="btn-outline-white"
            sx={{ my: 1, mx: 1.5 }}
          >
            My statistics
          </Button>
          <LoadingButton
            variant="outlined"
            loading={status === 'loading'}
            endIcon={<LogoutIcon />}
            className="btn-outline-white"
            sx={{ my: 1, mx: 1.5 }}
            onClick={signOut}
          >
            Sign Out
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Container component="main" className="main-layout">
        <CssBaseline />
        <Box className="app-container">
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default MainLayout
