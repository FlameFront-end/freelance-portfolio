import { useMemo, useState } from 'react'
import { accounts, categories, transactions } from '../../../data'
import {
  getMonthLabel,
  getMonthOptions,
} from '../../../entities/finance/model/selectors'
import { useDemoState } from '../../../shared/lib/use-demo-state'
import { useOneTimeSkeleton } from '../../../shared/lib/use-one-time-skeleton'
import { StateMessage } from '../../../shared/ui/state-message'
import { BalanceAreaChart } from '../components/balance-area-chart'
import { CategoryExpensesBar } from '../components/category-expenses-bar'
import { ReportsControls } from '../components/reports-controls'
import { ReportsSkeleton } from '../components/reports-skeleton'
import {
  type AccountScope,
  getCategoryExpenseSeries,
  getDailyBalanceSeries,
  getReportSummary,
} from '../lib/report-data'
import styles from './reports-page.module.scss'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function ReportsPage() {
  const demoState = useDemoState()
  const isInitialLoading = useOneTimeSkeleton('reports', 720)
  const monthOptions = useMemo(() => getMonthOptions(transactions), [])
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]?.value ?? '')
  const [selectedAccount, setSelectedAccount] = useState<AccountScope>('all')

  const monthLabel = useMemo(
    () => (selectedMonth ? getMonthLabel(selectedMonth) : 'No month selected'),
    [selectedMonth],
  )
  const accountLabel =
    selectedAccount === 'all'
      ? 'All accounts'
      : (accounts.find((account) => account.id === selectedAccount)?.name ?? 'Unknown')

  const dailyBalanceData = useMemo(
    () =>
      selectedMonth
        ? getDailyBalanceSeries(accounts, transactions, selectedMonth, selectedAccount)
        : [],
    [selectedAccount, selectedMonth],
  )
  const categoryExpenseData = useMemo(
    () =>
      selectedMonth
        ? getCategoryExpenseSeries(
            categories,
            transactions,
            selectedMonth,
            selectedAccount,
          )
        : [],
    [selectedAccount, selectedMonth],
  )
  const summary = useMemo(
    () =>
      selectedMonth
        ? getReportSummary(transactions, selectedMonth, selectedAccount)
        : { income: 0, expenses: 0, net: 0 },
    [selectedAccount, selectedMonth],
  )

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Reports</h2>
          <p className={styles.meta}>
            {monthLabel} | {accountLabel}
          </p>
        </div>
      </header>

      <ReportsControls
        monthOptions={monthOptions}
        selectedMonth={selectedMonth}
        selectedAccount={selectedAccount}
        accounts={accounts}
        onMonthChange={setSelectedMonth}
        onAccountChange={setSelectedAccount}
      />

      {demoState === 'loading' || (demoState === 'ready' && isInitialLoading) ? (
        <ReportsSkeleton />
      ) : demoState === 'error' ? (
        <StateMessage
          variant="error"
          title="Report generation failed"
          description="Mock error state: charts could not be generated for current filters."
        />
      ) : demoState === 'empty' ? (
        <StateMessage
          variant="empty"
          title="No report data"
          description="Mock empty state: there are no transactions for this period."
        />
      ) : (
        <>
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <p className={styles.summaryLabel}>Income</p>
              <p className={`numbers ${styles.summaryValue} ${styles.positive}`}>
                {moneyFormatter.format(summary.income)}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <p className={styles.summaryLabel}>Expenses</p>
              <p className={`numbers ${styles.summaryValue} ${styles.negative}`}>
                {moneyFormatter.format(summary.expenses)}
              </p>
            </article>
            <article className={styles.summaryCard}>
              <p className={styles.summaryLabel}>Net</p>
              <p
                className={`numbers ${styles.summaryValue} ${
                  summary.net >= 0 ? styles.positive : styles.negative
                }`}
              >
                {moneyFormatter.format(summary.net)}
              </p>
            </article>
          </div>

          <div className={styles.chartsGrid}>
            <BalanceAreaChart data={dailyBalanceData} monthLabel={monthLabel} />
            <CategoryExpensesBar data={categoryExpenseData} monthLabel={monthLabel} />
          </div>
        </>
      )}
    </section>
  )
}
