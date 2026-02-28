import { ArrowDownUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../shared/lib/format'
import type { Transaction, TransactionStatus } from '../../../shared/model/portfolio/types'
import { Card } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import styles from './RecentTransactionsCard.module.scss'

type RecentTransactionsCardProps = {
  transactions: Transaction[]
  isLoading: boolean
}

const statusTone: Record<TransactionStatus, 'success' | 'warning' | 'danger'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'danger',
}

export function RecentTransactionsCard({ transactions, isLoading }: RecentTransactionsCardProps) {
  const rows = transactions.slice(0, 6)

  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>Recent Transactions</h2>
        <Link to="/transactions" className={styles.viewAll}>
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.list} aria-hidden>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.primary}>
                <SkeletonBlock width={14} height={14} borderRadius={4} />
                <SkeletonBlock width={36} height={20} />
                <SkeletonBlock width={56} height={14} />
              </div>

              <div className={styles.meta}>
                <SkeletonBlock width={132} height={14} />
              </div>

              <div className={styles.valueCell}>
                <SkeletonBlock width={92} height={18} />
              </div>

              <div className={styles.statusCell}>
                <SkeletonBlock width={84} height={22} borderRadius={999} />
              </div>
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState title="No recent transactions" description="Latest operations will appear here." />
      ) : (
        <div className={styles.list}>
          {rows.map((transaction) => (
            <div key={transaction.id} className={styles.row}>
              <div className={styles.primary}>
                <ArrowDownUp size={14} />
                <span className={styles.symbol}>{transaction.assetSymbol}</span>
                <span className={styles.type}>{transaction.type}</span>
              </div>

              <div className={styles.meta}>
                {transaction.chain} • {new Date(transaction.timestamp).toLocaleDateString('en-US')}
              </div>

              <div className={styles.valueCell}>
                <p className={styles.value}>{formatCurrency(transaction.valueUsd)}</p>
              </div>

              <div className={styles.statusCell}>
                <StatusBadge tone={statusTone[transaction.status]}>{transaction.status}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
