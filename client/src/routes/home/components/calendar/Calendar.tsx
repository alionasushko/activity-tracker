import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import { useAppSelector } from '../../../../store/hooks'
import Event from './Event'
import { IEvent, IEventItem, ICalendarProps } from '../../../../types/calendar'
import { selectEvents } from '../../../../store/calendarSlice'
import './calendar.sass'

const localizer = momentLocalizer(moment)

const initProps = {
  localizer: localizer,
  defaultView: Views.MONTH,
  step: 15,
  timeslots: 4,
}

const DndCalendar = withDragAndDrop<IEventItem>(BigCalendar)

export const Calendar = ({ onShowEventView }: ICalendarProps) => {
  const data = useAppSelector(selectEvents)

  const components = {
    event: ({ event }: { event: any }) => {
      const data = event?.data
      if (data?.event) return <Event event={data?.event} />
      return null
    },
  }

  const events = data?.map((event: IEvent) => ({
    start: new Date(event.start),
    end: new Date(event.end),
    data: { event },
  }))

  return (
    <DndCalendar
      onSelectSlot={({ start, end }) => {
        onShowEventView({ start, end })
      }}
      onDoubleClickEvent={(event) => {
        const eventData = event?.data?.event
        eventData && onShowEventView(eventData)
      }}
      events={events}
      style={{ width: '100%' }}
      components={components}
      selectable
      {...initProps}
    />
  )
}
