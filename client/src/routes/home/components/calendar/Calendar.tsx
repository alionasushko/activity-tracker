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

  const onSelectSlot = ({ start, end }: IEventItem) => {
    onShowEventView({ start: start.toString(), end: end.toString() })
  }

  const onDoubleClickEvent = (e: IEventItem) => {
    const eventData = e?.data?.event
    eventData && onShowEventView(eventData)
  }

  const moveEvent = ({ start, end, event }: IEventItem) => {
    onShowEventView({ ...event?.data?.event, start: start.toString(), end: end.toString() })
  }

  return (
    <DndCalendar
      onSelectSlot={onSelectSlot}
      onDoubleClickEvent={onDoubleClickEvent}
      events={events}
      style={{ width: '100%' }}
      components={components}
      selectable
      onEventDrop={moveEvent}
      {...initProps}
    />
  )
}
