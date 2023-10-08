import React from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectAccount, signOutAsync } from '../../store/userSlice'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const navigate = useNavigate()

  const signOut = () => {
    dispatch(signOutAsync())
    navigate('/signin')
  }

  return (
    <Box className="app-container">
      <h1>Hello {account?.name}!</h1>
      <Button variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    </Box>
  )
}

export default Home
