import { AllocationCard } from '../components/AllocationCard'
import { PortfolioChartCard } from '../components/PortfolioChartCard'
import { RecentTransactionsCard } from '../components/RecentTransactionsCard'
import { SummaryCards } from '../components/SummaryCards'
import { WatchlistCard } from '../components/WatchlistCard'
import { useOneTimeSkeleton } from '../../../shared/lib/useOneTimeSkeleton'
import { activeMockScenario } from '../../../shared/model/portfolio/scenarios'
import { Card } from '../../../shared/ui/card/Card'
import { PageShell } from '../../../shared/ui/page-shell/PageShell'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { ErrorState } from '../../../shared/ui/states/ErrorState'
import styles from './DashboardPage.module.scss'

export function DashboardPage() {
  const { data, status, errorMessage } = activeMockScenario
  const isLoading = useOneTimeSkeleton('dashboard')

  if (status === 'error') {
    return (
      <PageShell
        title="Dashboard"
        description="Portfolio widgets are unavailable because the mock scenario is in error mode."
      >
        <Card interactive={false}>
          <ErrorState
            title="Dashboard failed to load"
            description={errorMessage ?? 'Mock provider timeout: unable to fetch portfolio data.'}
          />
        </Card>
      </PageShell>
    )
  }

  if (status === 'empty') {
    return (
      <PageShell
        title="Dashboard"
        description="No data was returned by the current scenario. Switch scenario to populate charts and tables."
      >
        <Card interactive={false}>
          <EmptyState
            title="No portfolio data"
            description="Summary cards, charts, and transaction feeds require at least one asset in mock data."
          />
        </Card>
      </PageShell>
    )
  }

  return (
    <PageShell
      title="Dashboard"
      description="Summary metrics, performance chart, allocation donut, recent transactions, and watchlist are now wired with mock data."
    >
      <div className={styles.layout}>
        <SummaryCards summary={data.portfolioSummary} isLoading={isLoading} />

        <div className={styles.mainGrid}>
          <PortfolioChartCard chartSeries={data.chartSeries} isLoading={isLoading} />
          <AllocationCard assets={data.assets} isLoading={isLoading} />
        </div>

        <div className={styles.secondaryGrid}>
          <RecentTransactionsCard transactions={data.transactions} isLoading={isLoading} />
          <WatchlistCard assets={data.assets} isLoading={isLoading} />
        </div>
      </div>
    </PageShell>
  )
}
