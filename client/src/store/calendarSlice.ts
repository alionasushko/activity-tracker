import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { ICalendar, IEventFormData } from '../types/calendar'
import { request } from '../api/config'

const startDate = new Date().toISOString()
const currentDate = new Date()
currentDate.setMinutes(currentDate.getMinutes() + 10)
const endDate = currentDate.toISOString()

export const initialEventState = {
  id: '',
  name: '',
  status: 'incomplete',
  location: '',
  notes: '',
  start: startDate,
  end: endDate,
}

const initialState: ICalendar = {
  status: 'idle',
  events: [],
  isOpenEventModal: false,
  event: initialEventState,
  error: null,
}

export const getEventsAsync = createAsyncThunk('get/events', async () => {
  return request({ method: 'GET', url: '/event' })
})

export const createEventAsync = createAsyncThunk('post/createEvent', async (values: IEventFormData) => {
  return request({ method: 'POST', url: '/event', data: values })
})

export const updateEventAsync = createAsyncThunk('put/updateEvent', async (values: IEventFormData) => {
  return await request({ method: 'PUT', url: '/event', data: values })
})

export const deleteEventAsync = createAsyncThunk('delete/event', async (id: string | number | undefined) => {
  return await request({ method: 'DELETE', url: `/event/${id}` })
})

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,

  reducers: {
    manageEventModal: (state, action) => {
      state.isOpenEventModal = action.payload
    },
    setEventValue: (state, action) => {
      state.event = action.payload
    },
    resetEvent: (state) => {
      state.event = initialEventState
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEventsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getEventsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.events = action.payload.data.events
      })
      .addCase(getEventsAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createEventAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createEventAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(createEventAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(updateEventAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateEventAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(updateEventAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(deleteEventAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteEventAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(deleteEventAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectEvents = (state: RootState) => state.calendar.events
export const selectCalendarStatus = (state: RootState) => state.calendar.status
export const selectEvent = (state: RootState) => state.calendar.event
export const selectIsOpenEventModal = (state: RootState) => state.calendar.isOpenEventModal

export const { manageEventModal, resetEvent, setEventValue } = calendarSlice.actions

export default calendarSlice.reducer
