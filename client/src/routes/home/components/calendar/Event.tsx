import { ChangeEvent, useEffect, useState } from 'react'
import { Box, Typography, Checkbox } from '@mui/material'
import { EVENT_STATUS_COLORS } from './constants'
import { IEventProps } from '../../../../types/calendar'
import { useAppDispatch } from '../../../../store/hooks'
import { updateEventAsync, getEventsAsync } from '../../../../store/calendarSlice'

const Event = ({ event }: IEventProps) => {
  const dispatch = useAppDispatch()
  const [isEventChecked, setIsEventChecked] = useState(event.status === 'complete')

  const isUpcomingEvent = new Date(event.end) > new Date()
  const background = isEventChecked
    ? EVENT_STATUS_COLORS.complete
    : isUpcomingEvent
    ? EVENT_STATUS_COLORS.upcoming
    : EVENT_STATUS_COLORS.incomplete

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsEventChecked(checked)
    const status = checked ? 'complete' : 'incomplete'
    const res = await dispatch(updateEventAsync({ ...event, status }))
    await dispatch(getEventsAsync())
    if ('error' in res) setIsEventChecked(!checked)
  }

  useEffect(() => {
    setIsEventChecked(event.status === 'complete')
  }, [event.status])

  return (
    <Box className="event" sx={{ backgroundColor: background }}>
      <Checkbox checked={isEventChecked} inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} />
      <div className="event-content">
        <Typography variant="body2" className="event-name">
          {event.name} hello world hello hello world
        </Typography>
      </div>
    </Box>
  )
}

export default Event
