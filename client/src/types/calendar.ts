/* eslint-disable no-unused-vars */
export interface IEvent {
  id: string
  name: string
  status: string
  location?: string
  notes?: string
  start: string | Date
  end: string | Date
}

export interface IEventItem {
  start: string | Date
  end: string | Date
  data?: { event?: IEvent }
  isDraggable?: boolean
}

export interface ICalendar {
  status: string
  events: IEvent[]
  event: IEvent | onShowEventViewParams
  isOpenEventModal: boolean
}

export interface ICalendarProps {
  onShowEventView: (event: onShowEventViewParams) => void
}

export type onShowEventViewParams = {
  id?: string
  name?: string
  status?: string
  location?: string
  notes?: string
  start: string | Date
  end: string | Date
}

export interface IEventProps {
  event: IEvent
}

export interface IEventFormData {
  name?: string
  location?: string
  notes?: string
  status?: string
  start: string | Date
  end: string | Date
}

export enum EventStatusCode {
  incomplete = 'incomplete',
  complete = 'complete',
}
