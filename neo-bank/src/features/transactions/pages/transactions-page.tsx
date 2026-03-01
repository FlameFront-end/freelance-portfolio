import { useMemo, useState } from 'react'
import { accounts, categories, transactions } from '../../../data'
import type { CategoryName } from '../../../entities/finance/model/types'
import { useDemoState } from '../../../shared/lib/use-demo-state'
import { useOneTimeSkeleton } from '../../../shared/lib/use-one-time-skeleton'
import { StateMessage } from '../../../shared/ui/state-message'
import { TransactionsFilters } from '../components/transactions-filters'
import { TransactionsMobileCards } from '../components/transactions-mobile-cards'
import { TransactionsSkeleton } from '../components/transactions-skeleton'
import { TransactionsTable } from '../components/transactions-table'
import {
  type DateRangePreset,
  filterTransactions,
  getPresetDateRange,
} from '../lib/filters'
import styles from './transactions-page.module.scss'

export function TransactionsPage() {
  const demoState = useDemoState()
  const isInitialLoading = useOneTimeSkeleton('transactions', 720)
  const referenceDate = useMemo(() => {
    const latest = transactions.reduce((currentLatest, transaction) => {
      if (!currentLatest) {
        return transaction.date
      }

      return transaction.date > currentLatest ? transaction.date : currentLatest
    }, '')

    return latest ? new Date(latest) : new Date()
  }, [])

  const initialPresetRange = useMemo(
    () => getPresetDateRange('this-month', referenceDate),
    [referenceDate],
  )
  const [datePreset, setDatePreset] = useState<DateRangePreset>('this-month')
  const [customFrom, setCustomFrom] = useState(initialPresetRange.from)
  const [customTo, setCustomTo] = useState(initialPresetRange.to)
  const [accountId, setAccountId] = useState('')
  const [category, setCategory] = useState<'' | CategoryName>('')
  const [type, setType] = useState<'' | 'Income' | 'Expense'>('')

  const filtered = useMemo(
    () =>
      filterTransactions(
        transactions,
        { datePreset, customFrom, customTo, accountId, category, type },
        referenceDate,
      ),
    [accountId, category, customFrom, customTo, datePreset, referenceDate, type],
  )

  const handleDatePresetChange = (value: DateRangePreset) => {
    setDatePreset(value)

    if (value !== 'custom') {
      const presetRange = getPresetDateRange(value, referenceDate)
      setCustomFrom(presetRange.from)
      setCustomTo(presetRange.to)
    }
  }

  const visibleTransactions = demoState === 'empty' ? [] : filtered

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Transactions</h2>
        <p className={styles.meta}>{visibleTransactions.length} results</p>
      </header>

      <TransactionsFilters
        datePreset={datePreset}
        customFrom={customFrom}
        customTo={customTo}
        accountId={accountId}
        category={category}
        type={type}
        accounts={accounts}
        categories={categories}
        onDatePresetChange={handleDatePresetChange}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
        onAccountIdChange={setAccountId}
        onCategoryChange={setCategory}
        onTypeChange={setType}
      />

      {demoState === 'loading' || (demoState === 'ready' && isInitialLoading) ? (
        <TransactionsSkeleton />
      ) : demoState === 'error' ? (
        <StateMessage
          variant="error"
          title="Transactions unavailable"
          description="Mock error state: failed to load operations history."
        />
      ) : (
        <>
          <div className={styles.desktopOnly}>
            <TransactionsTable transactions={visibleTransactions} accounts={accounts} />
          </div>

          <div className={styles.mobileOnly}>
            <TransactionsMobileCards
              transactions={visibleTransactions}
              accounts={accounts}
            />
          </div>
        </>
      )}
    </section>
  )
}
