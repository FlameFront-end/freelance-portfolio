import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DailyBalancePoint } from '../../lib/report-data'
import styles from './balance-area-chart.module.scss'

type BalanceAreaChartProps = {
  data: DailyBalancePoint[]
  monthLabel: string
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function BalanceAreaChart({ data, monthLabel }: BalanceAreaChartProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <h3 className={styles.title}>Balance By Day</h3>
        <p className={styles.meta}>{monthLabel}</p>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 8, right: 14, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.34} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="label"
              interval={0}
              minTickGap={0}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--text)', fontSize: 10 }}
            />
            <YAxis
              tickFormatter={(value: number) => currencyFormatter.format(value)}
              tickLine={false}
              axisLine={false}
              width={72}
              tick={{ fill: 'var(--text)', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ stroke: 'transparent' }}
              formatter={(value: number | undefined) => [
                currencyFormatter.format(value ?? 0),
                'Balance',
              ]}
              labelFormatter={(label) => `${monthLabel}, day ${String(label)}`}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid var(--border-2)',
                background: 'var(--panel)',
                color: 'var(--text)',
              }}
              itemStyle={{ color: 'var(--text)' }}
              labelStyle={{ color: 'var(--text)' }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--accent)"
              fill="url(#balanceGradient)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
