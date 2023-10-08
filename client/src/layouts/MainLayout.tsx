import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { CssBaseline, Box, Container } from '@mui/material'
import { getToken } from '../utils/auth'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectAccount, getUserCredentialsAsync } from '../store/userSlice'

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const accessToken = getToken()

  if (!accessToken) {
    return <Navigate to="signin" />
  }

  useEffect(() => {
    if (accessToken && !account) dispatch(getUserCredentialsAsync())
  }, [])

  return (
    <Container component="main" className="app">
      <CssBaseline />
      <Box className="app-container">
        <Outlet />
      </Box>
    </Container>
  )
}

export default MainLayout
