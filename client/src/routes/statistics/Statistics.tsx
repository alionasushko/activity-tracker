import React, { useEffect, useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import CustomTooltip from './components/CustomTooltip'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Box, Stack, Button, CircularProgress, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AxisDomain } from 'recharts/types/util/types'
import { getStatisticsAsync, selectStatistics, selectStatisticsStatus } from '../../store/statisticsSlice'
import { formatChartData, getTicks, fillTicksData, dateFormatter } from '../../utils/statistics'
import { EVENT_STATUS_COLORS } from '../../routes/home/components/calendar/constants'

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch()
  const statistics = useAppSelector(selectStatistics)
  const status = useAppSelector(selectStatisticsStatus)
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 7)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const getStatistics = () => {
    dispatch(getStatisticsAsync({ startDate, endDate }))
  }

  useEffect(getStatistics, [])

  const chartData = useMemo(() => formatChartData(statistics.chartData), [statistics.chartData])
  const tickStart = chartData[0]?.date
  const tickEnd = chartData[chartData.length - 1]?.date
  const domain: AxisDomain = [(dataMin: number) => dataMin, tickEnd]

  const ticks = useMemo(() => {
    if (tickStart && tickEnd) return getTicks(tickStart, tickEnd, 5)
  }, [tickStart, tickEnd])

  const filledData = useMemo(() => {
    if (chartData.length && ticks?.length) return fillTicksData(ticks, chartData)
  }, [ticks, chartData])

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 6 }}>
        <IconButton href="/">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" color="inherit" noWrap>
          My statistics
        </Typography>
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" gap={2} sx={{ ml: 2, mb: 6 }}>
          <DatePicker
            label="Start date"
            value={dayjs(startDate)}
            onChange={(newValue) => {
              if (!newValue) return
              setStartDate(new Date(newValue.toISOString()))
              setEndDate(new Date(newValue.toISOString()))
            }}
          />
          <DatePicker
            label="End date"
            value={dayjs(endDate)}
            minDate={dayjs(startDate)}
            onChange={(newValue) => newValue && setEndDate(new Date(newValue.toISOString()))}
          />
          <Button variant="contained" onClick={getStatistics}>
            Show
          </Button>
        </Stack>
      </LocalizationProvider>
      <Box>
        {status === 'loading' ? (
          <CircularProgress />
        ) : chartData.length ? (
          <ResponsiveContainer width="90%" height={500}>
            <AreaChart
              width={900}
              height={250}
              data={filledData}
              margin={{
                top: 10,
                right: 0,
                bottom: 10,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={EVENT_STATUS_COLORS.complete} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={EVENT_STATUS_COLORS.complete} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIncompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={EVENT_STATUS_COLORS.incomplete} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={EVENT_STATUS_COLORS.incomplete} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                scale="time"
                tickFormatter={dateFormatter}
                type="number"
                domain={domain}
                ticks={ticks}
              />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" layout="vertical" iconType="square" height={36} />
              <Area
                type="monotone"
                name={`Completed total: ${statistics.summary.completed}`}
                dataKey="completed"
                stroke={EVENT_STATUS_COLORS.complete}
                fillOpacity={1}
                fill="url(#colorCompleted)"
              />
              <Area
                type="monotone"
                name={`Incompleted total: ${statistics.summary.incompleted}`}
                dataKey="incompleted"
                stroke={EVENT_STATUS_COLORS.incomplete}
                fillOpacity={1}
                fill="url(#colorIncompleted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="h4" color="inherit" sx={{ mb: 4 }} noWrap>
            There are no statistics for this period
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Statistics
