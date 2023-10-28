import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import calendarSlice from './calendarSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    calendar: calendarSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
