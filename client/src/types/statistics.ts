export interface IChartData {
  date: number
  completed: number
  incompleted: number
}

export interface IStatistics {
  status: string
  data: {
    summary: {
      completed: number
      incompleted: number
    }
    chartData: IChartData[]
  }
}

export interface IRangeDates {
  startDate: Date
  endDate: Date
}
