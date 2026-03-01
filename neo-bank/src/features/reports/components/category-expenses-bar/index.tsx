import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CategoryExpensePoint } from '../../lib/report-data'
import styles from './category-expenses-bar.module.scss'

type CategoryExpensesBarProps = {
  data: CategoryExpensePoint[]
  monthLabel: string
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function CategoryExpensesBar({ data, monthLabel }: CategoryExpensesBarProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <h3 className={styles.title}>Expenses By Category</h3>
        <p className={styles.meta}>{monthLabel}</p>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 8, right: 14, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--text)', fontSize: 11 }}
            />
            <YAxis
              tickFormatter={(value: number) => currencyFormatter.format(value)}
              tickLine={false}
              axisLine={false}
              width={72}
              tick={{ fill: 'var(--text)', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              formatter={(value: number | undefined) => [
                currencyFormatter.format(value ?? 0),
                'Amount',
              ]}
              labelFormatter={(label) => `${String(label)} | ${monthLabel}`}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid var(--border-2)',
                background: 'var(--panel)',
                color: 'var(--text)',
              }}
              itemStyle={{ color: 'var(--text)' }}
              labelStyle={{ color: 'var(--text)' }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]} activeBar={false}>
              {data.map((item) => (
                <Cell key={item.category} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
