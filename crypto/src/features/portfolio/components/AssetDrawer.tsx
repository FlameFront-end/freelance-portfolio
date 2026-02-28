import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactNumber, formatCurrency, formatPercent } from '../../../shared/lib/format'
import type { Asset, Transaction, TransactionStatus } from '../../../shared/model/portfolio/types'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import styles from './AssetDrawer.module.scss'

type AssetDrawerProps = {
  asset: Asset
  transactions: Transaction[]
  onClose: () => void
}

type ChartPoint = {
  timeLabel: string
  price: number
}

const statusTone: Record<TransactionStatus, 'success' | 'warning' | 'danger'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'danger',
}

function buildAssetSeries(asset: Asset): ChartPoint[] {
  const start = asset.priceUsd * 0.9
  const drift = asset.change24hPct / 100

  return Array.from({ length: 12 }, (_, index) => {
    const progress = index / 11
    const wave = Math.sin((index + asset.balance) * 0.72) * 0.025

    return {
      timeLabel: `T${index + 1}`,
      price: start * (1 + drift * progress + wave),
    }
  })
}

export function AssetDrawer({ asset, transactions, onClose }: AssetDrawerProps) {
  const chartData = useMemo(() => buildAssetSeries(asset), [asset])
  const latestTransactions = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.assetSymbol === asset.symbol)
        .sort((left, right) => Date.parse(right.timestamp) - Date.parse(left.timestamp))
        .slice(0, 3),
    [asset.symbol, transactions],
  )

  return (
    <>
      <motion.button
        type="button"
        className={styles.overlay}
        aria-label="Close asset drawer"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.aside
        className={styles.drawer}
        aria-label={`${asset.symbol} details drawer`}
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 32 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className={styles.header}>
          <div className={styles.assetInfo}>
            <strong className={styles.symbol}>{asset.symbol}</strong>
            <span className={styles.meta}>
              {asset.name} • {asset.chain} • {asset.riskTag} risk
            </span>
          </div>

          <button type="button" className={styles.closeButton} aria-label="Close drawer" onClick={onClose}>
            <X size={16} />
          </button>
        </header>

        <div className={styles.content}>
          <Card interactive={false}>
            <p className={styles.blockTitle}>Balance</p>
            <p className={styles.balanceValue}>
              {formatCompactNumber(asset.balance)} {asset.symbol}
            </p>
            <p className={styles.balanceMeta}>
              {formatCurrency(asset.valueUsd)} •{' '}
              <span className={asset.change24hPct >= 0 ? styles.changePositive : styles.changeNegative}>
                {formatPercent(asset.change24hPct)}
              </span>
            </p>
          </Card>

          <Card interactive={false}>
            <p className={styles.blockTitle}>Price trend (mock)</p>
            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="timeLabel" hide />
                  <YAxis
                    hide
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tickFormatter={(value) => formatCompactNumber(Number(value))}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(label) => `Point ${String(label).replace('T', '')}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={asset.change24hPct >= 0 ? 'var(--success)' : 'var(--danger)'}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card interactive={false}>
            <p className={styles.blockTitle}>Actions</p>
            <div className={styles.actions}>
              <Button variant="primary">Buy</Button>
              <Button>Sell</Button>
              <Button variant="ghost">Swap</Button>
            </div>
          </Card>

          <Card interactive={false}>
            <p className={styles.blockTitle}>Latest 3 transactions</p>
            {latestTransactions.length === 0 ? (
              <EmptyState
                title="No transactions for this asset"
                description="New operations with this token will appear in the drawer."
              />
            ) : (
              <div className={styles.txList}>
                {latestTransactions.map((transaction) => (
                  <div key={transaction.id} className={styles.txRow}>
                    <div className={styles.txLeft}>
                      <strong>{transaction.type}</strong>
                      <span className={styles.txType}>{new Date(transaction.timestamp).toLocaleString('en-US')}</span>
                      <span className={styles.txHash}>{transaction.hashShort}</span>
                    </div>

                    <div className={styles.txRight}>
                      <span className={styles.txValue}>{formatCurrency(transaction.valueUsd)}</span>
                      <StatusBadge tone={statusTone[transaction.status]}>{transaction.status}</StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </motion.aside>
    </>
  )
}
