import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { IStatistics, IRangeDates } from '../types/statistics'
import { request } from '../api/config'

const initialState: IStatistics = {
  status: 'idle',
  data: {
    summary: {
      incompleted: 0,
      completed: 0,
    },
    chartData: [
      {
        date: 0,
        completed: 0,
        incompleted: 0,
      },
    ],
  },
}

export const getStatisticsAsync = createAsyncThunk('post/createEvent', async (values: IRangeDates) => {
  return request({ method: 'POST', url: '/event/statistics', data: values })
})

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStatisticsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getStatisticsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload.data
      })
      .addCase(getStatisticsAsync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectStatistics = (state: RootState) => state.statistics.data
export const selectStatisticsStatus = (state: RootState) => state.statistics.status

export default statisticsSlice.reducer
