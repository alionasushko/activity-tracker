import { ChangeEvent } from 'react'
import { Box, Typography, Stack, Checkbox } from '@mui/material'
import { toast } from 'react-toastify'
import { EVENT_STATUS_COLORS } from './constants'
import { IEventProps } from '../../../../types/calendar'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { selectCalendarStatus, updateEventAsync, getEventsAsync } from '../../../../store/calendarSlice'

const Event = ({ event }: IEventProps) => {
  const dispatch = useAppDispatch()
  const calendarStatus = useAppSelector(selectCalendarStatus)

  const isUpcomingEvent = new Date(event.end) > new Date()
  const background =
    event.status === 'complete'
      ? EVENT_STATUS_COLORS.complete
      : isUpcomingEvent
      ? EVENT_STATUS_COLORS.upcoming
      : EVENT_STATUS_COLORS.incomplete

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const status = checked ? 'complete' : 'incomplete'
    await dispatch(updateEventAsync({ ...event, status })).unwrap()
    dispatch(getEventsAsync())
    toast.success('Event status successfully updated', {
      autoClose: 3000,
      hideProgressBar: true,
    })
  }

  return (
    <Box sx={{ backgroundColor: background }}>
      <Stack direction="row" spacing={2}>
        <Checkbox
          checked={event.status === 'complete'}
          disabled={calendarStatus === 'loading'}
          inputProps={{ 'aria-label': 'controlled' }}
          onChange={handleChange}
        />
        <Typography variant="body2">{event.name}</Typography>
        {event.location && <Typography variant="body2">{event.location}</Typography>}
      </Stack>
    </Box>
  )
}

export default Event
