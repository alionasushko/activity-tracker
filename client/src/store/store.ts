import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import calendarSlice from './calendarSlice'
import statisticsSlice from './statisticsSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    calendar: calendarSlice,
    statistics: statisticsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
