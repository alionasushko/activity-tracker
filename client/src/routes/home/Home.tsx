import React from 'react'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../store/hooks'
import { selectAccount } from '../../store/userSlice'
import { Box } from '@mui/material'
import CalendarView from './components/calendarView/CalendarView'

const Home: React.FC = () => {
  const account = useAppSelector(selectAccount)

  return (
    <Box className="app-container">
      <Typography variant="h3" color="inherit" sx={{ mb: 4 }} noWrap>
        Hello {account?.name}!
      </Typography>
      <Box sx={{ minHeight: 500 }}>
        <CalendarView />
      </Box>
    </Box>
  )
}

export default Home
