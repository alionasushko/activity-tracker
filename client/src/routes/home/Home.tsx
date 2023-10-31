import React, { useState } from 'react'
import { Alert, AlertTitle, IconButton, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAppSelector } from '../../store/hooks'
import { selectAccount } from '../../store/userSlice'
import { Box } from '@mui/material'
import CalendarView from './components/calendarView/CalendarView'

const Home: React.FC = () => {
  const account = useAppSelector(selectAccount)
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(true)

  return (
    <Box>
      <Collapse in={isOpenAlert}>
        <Alert
          severity="info"
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setIsOpenAlert(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Hello {account?.name}! 👋</AlertTitle>
          Here you can add your events
        </Alert>
      </Collapse>
      <CalendarView />
    </Box>
  )
}

export default Home
