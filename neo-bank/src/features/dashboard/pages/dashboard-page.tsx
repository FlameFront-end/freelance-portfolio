import { useMemo } from 'react'
import { accounts, categories, transactions } from '../../../data'
import {
  getMonthOptions,
  getMonthlyTotals,
  getRecentTransactions,
  getSpendingByCategory,
  getTotalBalance,
} from '../../../entities/finance/model/selectors'
import { useDemoState } from '../../../shared/lib/use-demo-state'
import { useOneTimeSkeleton } from '../../../shared/lib/use-one-time-skeleton'
import { StateMessage } from '../../../shared/ui/state-message'
import { AccountsSection } from '../components/accounts-section'
import { BalanceOverview } from '../components/balance-overview'
import { DashboardSkeleton } from '../components/dashboard-skeleton'
import { RecentTransactions } from '../components/recent-transactions'
import { SpendingCategories } from '../components/spending-categories'
import styles from './dashboard-page.module.scss'

export function DashboardPage() {
  const demoState = useDemoState()
  const isLoading = useOneTimeSkeleton('dashboard', 760)
  const monthOptions = useMemo(() => getMonthOptions(transactions), [])
  const activeMonth = monthOptions[0]?.value ?? ''
  const activeMonthLabel = monthOptions[0]?.label ?? 'Current month'
  const totalBalance = useMemo(() => getTotalBalance(accounts), [])
  const monthlyTotals = useMemo(
    () =>
      activeMonth
        ? getMonthlyTotals(transactions, activeMonth)
        : { income: 0, expenses: 0, net: 0 },
    [activeMonth],
  )
  const spending = useMemo(
    () =>
      activeMonth ? getSpendingByCategory(transactions, categories, activeMonth) : [],
    [activeMonth],
  )
  const recentTransactions = useMemo(
    () => getRecentTransactions(transactions, 6),
    [],
  )

  if (demoState === 'loading' || (demoState === 'ready' && isLoading)) {
    return <DashboardSkeleton />
  }

  if (demoState === 'error') {
    return (
      <StateMessage
        variant="error"
        title="Dashboard failed to load"
        description="Mock error state: try reloading the page or check data source."
      />
    )
  }

  if (demoState === 'empty') {
    return (
      <StateMessage
        variant="empty"
        title="No dashboard data"
        description="Mock empty state: there are no balances or transactions to display."
      />
    )
  }

  return (
    <section className={styles.page}>
      <BalanceOverview
        totalBalance={totalBalance}
        income={monthlyTotals.income}
        expenses={monthlyTotals.expenses}
        net={monthlyTotals.net}
        monthLabel={activeMonthLabel}
      />

      <AccountsSection accounts={accounts} />

      <div className={styles.insightsGrid}>
        <SpendingCategories data={spending} monthLabel={activeMonthLabel} />
        <RecentTransactions
          transactions={recentTransactions}
          accounts={accounts}
          monthLabel={activeMonthLabel}
        />
      </div>
    </section>
  )
}
