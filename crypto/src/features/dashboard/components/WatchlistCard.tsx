import { useMemo } from 'react'
import { formatCurrency, formatPercent } from '../../../shared/lib/format'
import type { Asset } from '../../../shared/model/portfolio/types'
import { Card } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import { MiniSparkline } from './MiniSparkline'
import styles from './WatchlistCard.module.scss'

type WatchlistCardProps = {
  assets: Asset[]
  isLoading: boolean
}

type WatchlistRow = {
  id: string
  symbol: string
  name: string
  priceUsd: number
  change24hPct: number
  sparkline: number[]
}

function buildSparkline(asset: Asset): number[] {
  const start = asset.priceUsd
  const trend = asset.change24hPct / 100

  return Array.from({ length: 18 }, (_, index) => {
    const progress = index / 17
    const wave = Math.sin((index + asset.balance) * 0.75) * 0.012
    const drift = trend * progress * 0.7

    return start * (1 + wave + drift)
  })
}

export function WatchlistCard({ assets, isLoading }: WatchlistCardProps) {
  const watchlist = useMemo<WatchlistRow[]>(
    () =>
      [...assets]
        .sort((left, right) => right.valueUsd - left.valueUsd)
        .slice(0, 5)
        .map((asset) => ({
          id: asset.id,
          symbol: asset.symbol,
          name: asset.name,
          priceUsd: asset.priceUsd,
          change24hPct: asset.change24hPct,
          sparkline: buildSparkline(asset),
        })),
    [assets],
  )

  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>Watchlist</h2>
      </div>

      {isLoading ? (
        <div className={styles.list} aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.asset}>
                <SkeletonBlock width={44} height={16} />
                <SkeletonBlock width={90} height={14} />
              </div>

              <div className={styles.quote}>
                <SkeletonBlock width={112} height={16} />
                <SkeletonBlock width={64} height={14} />
              </div>

              <SkeletonBlock width={96} height={34} borderRadius={8} />
            </div>
          ))}
        </div>
      ) : watchlist.length === 0 ? (
        <EmptyState title="Watchlist is empty" description="Add assets to populate quick market tracking." />
      ) : (
        <div className={styles.list}>
          {watchlist.map((asset) => (
            <div key={asset.id} className={styles.row}>
              <div className={styles.asset}>
                <span className={styles.symbol}>{asset.symbol}</span>
                <span className={styles.name}>{asset.name}</span>
              </div>

              <div className={styles.quote}>
                <p className={styles.price}>{formatCurrency(asset.priceUsd)}</p>
                <p className={`${styles.change} ${asset.change24hPct >= 0 ? styles.positive : styles.negative}`}>
                  {formatPercent(asset.change24hPct)}
                </p>
              </div>

              <MiniSparkline values={asset.sparkline} positive={asset.change24hPct >= 0} />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
