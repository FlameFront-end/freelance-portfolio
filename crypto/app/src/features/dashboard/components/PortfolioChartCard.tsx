import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '../../../shared/lib/cn'
import { formatCompactNumber, formatCurrency } from '../../../shared/lib/format'
import type { ChartPeriod, ChartPoint, ChartSeriesMap } from '../../../shared/model/portfolio/types'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import styles from './PortfolioChartCard.module.scss'

type PortfolioChartCardProps = {
  chartSeries: ChartSeriesMap
  isLoading: boolean
}

type ChartTooltipProps = {
  active?: boolean
  payload?: Array<{ value?: number | string }>
  label?: string
}

const periods: ChartPeriod[] = ['1D', '7D', '1M', '1Y']

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const rawValue = payload[0]?.value
  if (typeof rawValue !== 'number') {
    return null
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>{formatCurrency(rawValue)}</p>
    </div>
  )
}

export function PortfolioChartCard({ chartSeries, isLoading }: PortfolioChartCardProps) {
  const [period, setPeriod] = useState<ChartPeriod>('7D')
  const series = chartSeries[period]

  const chartData = useMemo(
    () =>
      series.map((point: ChartPoint) => ({
        ...point,
        valueCompact: formatCompactNumber(point.valueUsd),
      })),
    [series],
  )

  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>Portfolio Performance</h2>

        <div className={styles.periods}>
          {periods.map((periodOption) => (
            <Button
              key={periodOption}
              size="sm"
              variant="ghost"
              className={cn(styles.periodButton, period === periodOption && styles.activePeriod)}
              onClick={() => setPeriod(periodOption)}
            >
              {periodOption}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className={styles.chartSkeleton}>
          <SkeletonBlock width="100%" height="290px" />
        </div>
      ) : chartData.length === 0 ? (
        <EmptyState
          title="No chart points available"
          description="Selected timeframe does not have values in this mock scenario."
        />
      ) : (
        <div className={styles.chartArea}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 6, right: 10, top: 12, bottom: 8 }}>
              <defs>
                <linearGradient id="portfolio-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="timeLabel"
                tick={{ fill: 'var(--text-2)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--text-2)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
                width={52}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--accent)', strokeOpacity: 0.25 }} />
              <Area
                type="monotone"
                dataKey="valueUsd"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#portfolio-area-fill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
