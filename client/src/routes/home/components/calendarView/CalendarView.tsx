import { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch } from '../../../../store/hooks'
import { manageEventModal, setEventValue, getEventsAsync } from '../../../../store/calendarSlice'
import { Calendar } from '../calendar/Calendar'
import { onShowEventViewParams } from '../../../../types/calendar'
import EventFormModal from '../eventForm/EventFormModal'

const CalendarView = () => {
  const dispatch = useAppDispatch()

  const onClickCreateEvent = () => {
    dispatch(manageEventModal(true))
  }

  const onShowEventView = (event: onShowEventViewParams) => {
    dispatch(setEventValue(event))
    dispatch(manageEventModal(true))
  }

  useEffect(() => {
    dispatch(getEventsAsync())
  }, [])

  return (
    <Box className="calendar-container">
      <Button variant="contained" endIcon={<AddIcon />} sx={{ mb: 2 }} onClick={onClickCreateEvent}>
        Create
      </Button>
      <Calendar onShowEventView={onShowEventView} />
      <EventFormModal />
    </Box>
  )
}

export default CalendarView
