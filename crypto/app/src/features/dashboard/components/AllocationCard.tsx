import { useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '../../../shared/lib/cn'
import { formatCurrency } from '../../../shared/lib/format'
import type { Asset } from '../../../shared/model/portfolio/types'
import { Card } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import styles from './AllocationCard.module.scss'

type AllocationCardProps = {
  assets: Asset[]
  isLoading: boolean
}

type AllocationPoint = {
  id: string
  symbol: string
  valueUsd: number
  allocationPct: number
  color: string
}

type AllocationTooltipPayload = {
  payload?: AllocationPoint
}

type AllocationTooltipProps = {
  active?: boolean
  payload?: AllocationTooltipPayload[]
}

const palette = ['#7C7CFF', '#5E9BFF', '#33C6E8', '#36D399', '#F59E0B', '#EC4899', '#A855F7']

function AllocationTooltip({ active, payload }: AllocationTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const point = payload[0]?.payload
  if (!point) {
    return null
  }

  return (
    <div className={styles.legendItem}>
      <div className={styles.legendLeft}>
        <span className={styles.dot} style={{ background: point.color }} />
        <span className={styles.legendSymbol}>{point.symbol}</span>
      </div>
      <span className={styles.legendValue}>{formatCurrency(point.valueUsd)}</span>
    </div>
  )
}

export function AllocationCard({ assets, isLoading }: AllocationCardProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const allocationData = useMemo<AllocationPoint[]>(
    () =>
      [...assets]
        .sort((left, right) => right.allocationPct - left.allocationPct)
        .map((asset, index) => ({
          id: asset.id,
          symbol: asset.symbol,
          valueUsd: asset.valueUsd,
          allocationPct: asset.allocationPct,
          color: palette[index % palette.length],
        })),
    [assets],
  )
  const allocationSkeletonRows = Math.max(allocationData.length, 4)

  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>Allocation</h2>
      </div>

      {isLoading ? (
        <div className={styles.body}>
          <div className={styles.chartArea}>
            <SkeletonBlock width="100%" height="220px" />
          </div>

          <div className={styles.legend} aria-hidden>
            {Array.from({ length: allocationSkeletonRows }).map((_, index) => (
              <div key={index} className={cn(styles.legendItem, styles.legendSkeletonItem)}>
                <span className={styles.legendLeft}>
                  <SkeletonBlock width={10} height={10} borderRadius={999} />
                  <SkeletonBlock width="44px" height="14px" />
                </span>
                <SkeletonBlock width="40px" height="12px" />
              </div>
            ))}
          </div>
        </div>
      ) : allocationData.length === 0 ? (
        <EmptyState
          title="No allocation yet"
          description="Donut chart will appear after assets become available in the portfolio."
        />
      ) : (
        <div className={styles.body}>
          <div className={styles.chartArea}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  dataKey="allocationPct"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                  isAnimationActive={false}
                  onMouseEnter={(_, index) => setHoveredId(allocationData[index].id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {allocationData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.color}
                      fillOpacity={!hoveredId || hoveredId === entry.id ? 1 : 0.35}
                      stroke="var(--panel)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<AllocationTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.legend}>
            {allocationData.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={cn(styles.legendItem, hoveredId && hoveredId !== entry.id && styles.legendItemFaded)}
                onMouseEnter={() => setHoveredId(entry.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span className={styles.legendLeft}>
                  <span className={styles.dot} style={{ background: entry.color }} />
                  <span className={styles.legendSymbol}>{entry.symbol}</span>
                </span>
                <span className={styles.legendValue}>{entry.allocationPct.toFixed(1)}%</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
