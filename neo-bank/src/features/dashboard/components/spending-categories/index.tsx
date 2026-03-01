import { useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../../lib/formatters'
import styles from './spending-categories.module.scss'

type SpendingItem = {
  category: string
  color: string
  amount: number
  percent: number
}

type SpendingCategoriesProps = {
  data: SpendingItem[]
  monthLabel: string
}

export function SpendingCategories({ data, monthLabel }: SpendingCategoriesProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const total = useMemo(
    () => data.reduce((sum, category) => sum + category.amount, 0),
    [data],
  )
  const chartData = useMemo(() => data.filter((item) => item.amount > 0), [data])

  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <h2 className={styles.title}>Spending Categories</h2>
        <p className={styles.meta}>{monthLabel}</p>
      </div>

      {chartData.length > 0 ? (
        <div className={styles.chartWrap}>
          <div className={styles.chartArea}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={2}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={item.category}
                      fill={item.color}
                      fillOpacity={
                        activeIndex === -1 || activeIndex === index ? 1 : 0.34
                      }
                      onMouseEnter={() => setActiveIndex(index)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) => [
                    formatCurrency(value ?? 0),
                    'Amount',
                  ]}
                  contentStyle={{
                    borderRadius: 10,
                    border: '1px solid var(--border-2)',
                    background: 'var(--panel)',
                    color: 'var(--text)',
                  }}
                  itemStyle={{ color: 'var(--text)' }}
                  labelStyle={{ color: 'var(--text)' }}
                  labelFormatter={(label) => `Category: ${String(label)}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className={`numbers ${styles.total}`}>{formatCurrency(total)}</p>
            <p className={styles.totalLabel}>Total monthly spending</p>
          </div>

          <ul className={styles.legend}>
            {chartData.map((item, index) => {
              const isActive = index === activeIndex
              const isMuted = activeIndex !== -1 && !isActive

              return (
                <li
                  key={item.category}
                  className={`${styles.legendItem} ${isActive ? styles.active : ''} ${
                    isMuted ? styles.muted : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: item.color }}
                    aria-hidden
                  />
                  <span className={styles.category}>{item.category}</span>
                  <span className={`numbers ${styles.percent}`}>
                    {item.percent.toFixed(1)}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className={styles.empty}>No spending data for selected month.</div>
      )}
    </section>
  )
}
