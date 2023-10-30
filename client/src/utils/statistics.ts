import { add, format, differenceInCalendarDays } from 'date-fns'
import { IChartData } from '../types/statistics'

const dateFormatter = (date: string) => {
  return format(new Date(date), 'dd/MMM')
}

/**
 * get the dates between `startDate` and `endSate` with equal granularity
 */
const getTicks = (startDate: number, endDate: number, num: number) => {
  const diffDays = differenceInCalendarDays(endDate, startDate)

  let current = startDate,
    velocity = Math.round(diffDays / (num - 1))

  const ticks = [startDate]

  for (let i = 1; i < num - 1; i++) {
    ticks.push(add(current, { days: i * velocity }).getTime())
  }

  ticks.push(endDate)
  return ticks
}

/**
 * Add data of the date in ticks,
 * if there is no data in that date in `data`.
 */
const fillTicksData = (_ticks: number[], data: IChartData[]) => {
  const ticks = [..._ticks]
  const filled = []
  let currentTick = ticks.shift()
  let lastData = null
  for (const it of data) {
    if (ticks.length && currentTick && it.date > currentTick && lastData) {
      filled.push({ ...lastData, ...{ date: currentTick } })
      currentTick = ticks.shift()
    } else if (ticks.length && it.date === currentTick) {
      currentTick = ticks.shift()
    }

    filled.push(it)
    lastData = it
  }

  return filled
}

const formatChartData = (data: IChartData[]) => {
  return data.map((item) => ({ ...item, date: new Date(item.date).getTime() }))
}

export { dateFormatter, getTicks, fillTicksData, formatChartData }
