import type { ChartSeriesMap } from './types'

export const chartSeriesMock: ChartSeriesMap = {
  '1D': [
    { timeLabel: '00:00', valueUsd: 150950 },
    { timeLabel: '04:00', valueUsd: 151220 },
    { timeLabel: '08:00', valueUsd: 152410 },
    { timeLabel: '12:00', valueUsd: 151980 },
    { timeLabel: '16:00', valueUsd: 152740 },
    { timeLabel: '20:00', valueUsd: 153120 },
    { timeLabel: 'Now', valueUsd: 153585 },
  ],
  '7D': [
    { timeLabel: 'Mon', valueUsd: 146820 },
    { timeLabel: 'Tue', valueUsd: 147940 },
    { timeLabel: 'Wed', valueUsd: 149380 },
    { timeLabel: 'Thu', valueUsd: 148720 },
    { timeLabel: 'Fri', valueUsd: 150210 },
    { timeLabel: 'Sat', valueUsd: 152430 },
    { timeLabel: 'Sun', valueUsd: 153585 },
  ],
  '1M': [
    { timeLabel: 'W1', valueUsd: 141200 },
    { timeLabel: 'W2', valueUsd: 144860 },
    { timeLabel: 'W3', valueUsd: 146430 },
    { timeLabel: 'W4', valueUsd: 149520 },
    { timeLabel: 'W5', valueUsd: 153585 },
  ],
  '1Y': [
    { timeLabel: 'Mar', valueUsd: 101200 },
    { timeLabel: 'May', valueUsd: 108950 },
    { timeLabel: 'Jul', valueUsd: 117400 },
    { timeLabel: 'Sep', valueUsd: 124100 },
    { timeLabel: 'Nov', valueUsd: 139800 },
    { timeLabel: 'Jan', valueUsd: 149760 },
    { timeLabel: 'Feb', valueUsd: 153585 },
  ],
}

export const emptyChartSeries: ChartSeriesMap = {
  '1D': [],
  '7D': [],
  '1M': [],
  '1Y': [],
}
