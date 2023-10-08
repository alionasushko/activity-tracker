import React from 'react'
import { Outlet } from 'react-router-dom'
import { CssBaseline, Box, Container } from '@mui/material'

const GuestLayout: React.FC = () => {
  return (
    <Container component="main" className="app">
      <CssBaseline />
      <Box className="app-container">
        <Outlet />
      </Box>
    </Container>
  )
}

export default GuestLayout
