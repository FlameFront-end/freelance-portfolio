import { AnimatePresence } from 'framer-motion'
import { ArrowDownUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatCurrency, formatCompactNumber } from '../../../shared/lib/format'
import { useOneTimeSkeleton } from '../../../shared/lib/useOneTimeSkeleton'
import { activeMockScenario } from '../../../shared/model/portfolio/scenarios'
import type {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../../../shared/model/portfolio/types'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { DataTable, type DataTableColumn } from '../../../shared/ui/data-table/DataTable'
import { PageShell } from '../../../shared/ui/page-shell/PageShell'
import { SelectField } from '../../../shared/ui/select-field/SelectField'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import { TransactionModal } from '../components/TransactionModal'
import styles from './TransactionsPage.module.scss'

export function TransactionsPage() {
  const isLoading = useOneTimeSkeleton('transactions')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [chainFilter, setChainFilter] = useState('all')
  const [dateRange, setDateRange] = useState<'all' | '7d' | '30d' | '90d'>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const allTransactions = activeMockScenario.data.transactions
  const chains = Array.from(new Set(allTransactions.map((transaction) => transaction.chain)))
  const transactionTypes: TransactionType[] = ['Buy', 'Sell', 'Swap', 'Transfer']
  const transactionStatuses: TransactionStatus[] = ['Completed', 'Pending', 'Failed']

  const filteredTransactions = useMemo(() => {
    const now = Date.now()

    return [...allTransactions]
      .filter((transaction) => {
        const isTypeMatch = typeFilter === 'all' || transaction.type === typeFilter
        const isStatusMatch = statusFilter === 'all' || transaction.status === statusFilter
        const isChainMatch = chainFilter === 'all' || transaction.chain === chainFilter

        let isDateMatch = true
        if (dateRange !== 'all') {
          const rangeDays = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
          const maxDiff = rangeDays * 24 * 60 * 60 * 1000
          isDateMatch = now - new Date(transaction.timestamp).getTime() <= maxDiff
        }

        return isTypeMatch && isStatusMatch && isChainMatch && isDateMatch
      })
      .sort((left, right) => Date.parse(right.timestamp) - Date.parse(left.timestamp))
  }, [allTransactions, chainFilter, dateRange, statusFilter, typeFilter])

  useEffect(() => {
    if (!selectedTransaction) {
      return
    }

    const existsInFiltered = filteredTransactions.some(
      (transaction) => transaction.id === selectedTransaction.id,
    )
    if (!existsInFiltered) {
      setSelectedTransaction(null)
    }
  }, [filteredTransactions, selectedTransaction])

  useEffect(() => {
    if (!selectedTransaction) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTransaction(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedTransaction])

  const statusTone: Record<TransactionStatus, 'success' | 'warning' | 'danger'> = {
    Completed: 'success',
    Pending: 'warning',
    Failed: 'danger',
  }

  const columns: DataTableColumn<Transaction>[] = [
    {
      id: 'type',
      header: 'Type',
      renderCell: (transaction) => (
        <span className={styles.typeCell}>
          <ArrowDownUp size={14} />
          {transaction.type}
        </span>
      ),
    },
    {
      id: 'asset',
      header: 'Asset',
      renderCell: (transaction) => transaction.assetSymbol,
    },
    {
      id: 'amount',
      header: 'Amount',
      align: 'right',
      renderCell: (transaction) => formatCompactNumber(transaction.amount),
    },
    {
      id: 'value',
      header: 'Value',
      align: 'right',
      renderCell: (transaction) => <span className={styles.value}>{formatCurrency(transaction.valueUsd)}</span>,
    },
    {
      id: 'chain',
      header: 'Chain',
      renderCell: (transaction) => transaction.chain,
    },
    {
      id: 'address',
      header: 'Address',
      renderCell: (transaction) => transaction.addressShort,
    },
    {
      id: 'status',
      header: 'Status',
      align: 'right',
      renderCell: (transaction) => (
        <StatusBadge tone={statusTone[transaction.status]}>{transaction.status}</StatusBadge>
      ),
    },
    {
      id: 'time',
      header: 'Time',
      align: 'right',
      renderCell: (transaction) => (
        <span className={styles.time}>{new Date(transaction.timestamp).toLocaleString('en-US')}</span>
      ),
    },
  ]

  const resetFilters = () => {
    setTypeFilter('all')
    setStatusFilter('all')
    setChainFilter('all')
    setDateRange('all')
  }

  return (
    <PageShell
      title="Transactions"
      description="Filterable transaction table with modal details (status/hash/fee/timestamp + copy actions)."
    >
      {isLoading ? (
        <div className={styles.sectionStack}>
          <Card className={styles.controlsCard}>
            <div className={styles.controlsGrid} aria-hidden>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="28%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="34%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="30%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.controlsSkeletonField}>
                <SkeletonBlock width="44%" height={12} />
                <SkeletonBlock width="100%" height={38} />
              </div>
              <div className={styles.footer}>
                <SkeletonBlock width={70} height={30} borderRadius={10} />
              </div>
            </div>
          </Card>

          <Card className={styles.tableCard} contentClassName={styles.tableCard}>
            <div className={styles.tableSkeleton} aria-hidden>
              <div className={styles.tableSkeletonHead}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonBlock key={index} width="72%" height={12} />
                ))}
              </div>

              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className={styles.tableSkeletonRow}>
                  <SkeletonBlock width="60%" height={16} />
                  <SkeletonBlock width="46%" height={16} />
                  <SkeletonBlock width="54%" height={16} />
                  <SkeletonBlock width="60%" height={16} />
                  <SkeletonBlock width="46%" height={16} />
                  <SkeletonBlock width="56%" height={16} />
                  <SkeletonBlock width="62%" height={22} borderRadius={999} />
                  <SkeletonBlock width="74%" height={16} />
                </div>
              ))}
            </div>

            <div className={styles.mobileSkeletonList} aria-hidden>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.mobileSkeletonItem}>
                  <div className={styles.mobileSkeletonHead}>
                    <SkeletonBlock width="42%" height={16} />
                    <SkeletonBlock width={84} height={22} borderRadius={999} />
                  </div>
                  <div className={styles.mobileSkeletonGrid}>
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                    <SkeletonBlock width="100%" height={14} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className={styles.sectionStack}>
          <Card className={styles.controlsCard}>
            <div className={styles.controlsGrid}>
              <SelectField
                label="Type"
                value={typeFilter}
                onChange={(nextValue) => setTypeFilter(nextValue)}
                options={[
                  { value: 'all', label: 'All types' },
                  ...transactionTypes.map((type) => ({ value: type, label: type })),
                ]}
              />

              <SelectField
                label="Status"
                value={statusFilter}
                onChange={(nextValue) => setStatusFilter(nextValue)}
                options={[
                  { value: 'all', label: 'All statuses' },
                  ...transactionStatuses.map((status) => ({ value: status, label: status })),
                ]}
              />

              <SelectField
                label="Chain"
                value={chainFilter}
                onChange={(nextValue) => setChainFilter(nextValue)}
                options={[{ value: 'all', label: 'All chains' }, ...chains.map((chain) => ({ value: chain, label: chain }))]}
              />

              <SelectField
                label="Date range"
                value={dateRange}
                onChange={(nextValue) => setDateRange(nextValue as 'all' | '7d' | '30d' | '90d')}
                options={[
                  { value: 'all', label: 'All dates' },
                  { value: '7d', label: 'Last 7 days' },
                  { value: '30d', label: 'Last 30 days' },
                  { value: '90d', label: 'Last 90 days' },
                ]}
              />

              <div className={styles.footer}>
                <Button size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          <Card className={styles.tableCard} contentClassName={styles.tableCard}>
            {filteredTransactions.length === 0 ? (
              <EmptyState
                title="No transactions matched your filters"
                description="Change type, status, chain, or date range to see matching rows."
                action={
                  <Button variant="primary" size="sm" onClick={resetFilters}>
                    Reset filters
                  </Button>
                }
              />
            ) : (
              <>
                <div className={styles.desktopTable}>
                  <DataTable
                    columns={columns}
                    rows={filteredTransactions}
                    rowKey={(transaction) => transaction.id}
                    onRowClick={setSelectedTransaction}
                    rowAriaLabel={(transaction) => `Open details for transaction ${transaction.id}`}
                  />
                </div>

                <div className={styles.mobileList}>
                  {filteredTransactions.map((transaction) => (
                    <button
                      key={transaction.id}
                      type="button"
                      className={styles.mobileItem}
                      onClick={() => setSelectedTransaction(transaction)}
                      aria-label={`Open details for transaction ${transaction.id}`}
                    >
                      <div className={styles.mobileHead}>
                        <span className={styles.mobileTitle}>
                          {transaction.type} • {transaction.assetSymbol}
                        </span>
                        <StatusBadge tone={statusTone[transaction.status]}>{transaction.status}</StatusBadge>
                      </div>

                      <div className={styles.mobileGrid}>
                        <span className={styles.mobileLabel}>Amount</span>
                        <span>{formatCompactNumber(transaction.amount)}</span>

                        <span className={styles.mobileLabel}>Value</span>
                        <span className={styles.value}>{formatCurrency(transaction.valueUsd)}</span>

                        <span className={styles.mobileLabel}>Chain</span>
                        <span>{transaction.chain}</span>

                        <span className={styles.mobileLabel}>Address</span>
                        <span>{transaction.addressShort}</span>

                        <span className={styles.mobileLabel}>Time</span>
                        <span className={styles.time}>{new Date(transaction.timestamp).toLocaleString('en-US')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </Card>

          <AnimatePresence>
            {selectedTransaction ? (
              <TransactionModal
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
              />
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </PageShell>
  )
}
