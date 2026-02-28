import { motion } from 'framer-motion'
import type { PortfolioSummary } from '../../../shared/model/portfolio/types'
import { formatCurrency, formatPercent } from '../../../shared/lib/format'
import { Card } from '../../../shared/ui/card/Card'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import styles from './SummaryCards.module.scss'

type SummaryCardsProps = {
  summary: PortfolioSummary
  isLoading: boolean
}

type SummaryCardItem = {
  id: string
  label: string
  value: string
  meta: string
  tone?: 'success' | 'danger'
  skeleton: {
    labelWidth: string
    valueWidth: string
    metaWidth: string
  }
}

export function SummaryCards({ summary, isLoading }: SummaryCardsProps) {
  const cards: SummaryCardItem[] = [
    {
      id: 'total-balance',
      label: 'Total Balance',
      value: formatCurrency(summary.totalValueUsd),
      meta: `Across ${summary.totalAssetsCount} assets`,
      skeleton: {
        labelWidth: '48%',
        valueWidth: '72%',
        metaWidth: '52%',
      },
    },
    {
      id: 'pnl-24h',
      label: '24h PnL',
      value: formatCurrency(summary.change24hUsd),
      meta: formatPercent(summary.change24hPct),
      tone: summary.change24hPct >= 0 ? 'success' : 'danger',
      skeleton: {
        labelWidth: '34%',
        valueWidth: '56%',
        metaWidth: '30%',
      },
    },
    {
      id: 'total-assets',
      label: 'Total Assets',
      value: summary.totalAssetsCount.toString(),
      meta: 'Diversified across chains',
      skeleton: {
        labelWidth: '42%',
        valueWidth: '24%',
        metaWidth: '64%',
      },
    },
    {
      id: 'best-performer',
      label: 'Best Performer',
      value: summary.bestPerformer?.symbol ?? 'N/A',
      meta: summary.bestPerformer ? formatPercent(summary.bestPerformer.change24hPct) : '--',
      tone: 'success',
      skeleton: {
        labelWidth: '54%',
        valueWidth: '32%',
        metaWidth: '26%',
      },
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card>
            <div className={styles.cardBody}>
              {isLoading ? (
                <>
                  <SkeletonBlock width={card.skeleton.labelWidth} height="14px" />
                  <SkeletonBlock width={card.skeleton.valueWidth} height="26px" />
                  <SkeletonBlock width={card.skeleton.metaWidth} height="14px" />
                </>
              ) : (
                <>
                  <p className={styles.label}>{card.label}</p>
                  <p className={styles.value}>{card.value}</p>
                  <p
                    className={`${styles.meta} ${card.tone === 'success' ? styles.success : ''} ${card.tone === 'danger' ? styles.danger : ''}`}
                  >
                    {card.meta}
                  </p>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
