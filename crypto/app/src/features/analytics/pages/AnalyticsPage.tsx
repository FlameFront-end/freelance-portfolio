import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency, formatPercent } from '../../../shared/lib/format'
import { useOneTimeSkeleton } from '../../../shared/lib/useOneTimeSkeleton'
import { activeMockScenario } from '../../../shared/model/portfolio/scenarios'
import type { Asset, Transaction } from '../../../shared/model/portfolio/types'
import { Card } from '../../../shared/ui/card/Card'
import { DataTable, type DataTableColumn } from '../../../shared/ui/data-table/DataTable'
import { PageShell } from '../../../shared/ui/page-shell/PageShell'
import { EmptyState } from '../../../shared/ui/states/EmptyState'
import { ErrorState } from '../../../shared/ui/states/ErrorState'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import styles from './AnalyticsPage.module.scss'

const tooltipContentStyle = {
  backgroundColor: 'var(--panel)',
  border: '1px solid var(--border-2)',
  borderRadius: '10px',
  color: 'var(--text)',
  boxShadow: '0 12px 24px rgba(2, 6, 23, 0.25)',
}

const tooltipLabelStyle = {
  color: 'var(--text-2)',
  marginBottom: '4px',
}

const tooltipItemStyle = {
  color: 'var(--text)',
}

export function AnalyticsPage() {
  const { status, errorMessage, data } = activeMockScenario
  const isLoading = useOneTimeSkeleton('analytics')

  if (status === 'error') {
    return (
      <PageShell title="Analytics" description="Unable to compute analytics in the current scenario.">
        <Card interactive={false}>
          <ErrorState description={errorMessage ?? 'Analytics failed to load in mock error mode.'} />
        </Card>
      </PageShell>
    )
  }

  if (status === 'empty') {
    return (
      <PageShell title="Analytics" description="No assets/transactions are available for analytics.">
        <Card interactive={false}>
          <EmptyState
            title="No analytics data"
            description="Switch to the default mock scenario to render charts and metrics."
          />
        </Card>
      </PageShell>
    )
  }

  if (isLoading) {
    return (
      <PageShell
        title="Analytics"
        description="Portfolio intelligence view with concentration, execution quality, chain exposure, risk profile, and volume trend."
      >
        <div className={styles.layout}>
          <div className={styles.kpiGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className={styles.kpiSkeleton}>
                <SkeletonBlock width="46%" height={12} />
                <SkeletonBlock width="64%" height={26} />
                <SkeletonBlock width="56%" height={12} />
              </Card>
            ))}
          </div>

          <div className={styles.chartsGrid}>
            <Card className={styles.chartCard}>
              <div className={styles.chartSkeletonHead}>
                <SkeletonBlock width="34%" height={14} />
                <SkeletonBlock width="52%" height={12} />
              </div>
              <SkeletonBlock width="100%" height={260} />
            </Card>

            <Card className={styles.chartCard}>
              <div className={styles.chartSkeletonHead}>
                <SkeletonBlock width="28%" height={14} />
                <SkeletonBlock width="48%" height={12} />
              </div>
              <SkeletonBlock width="100%" height={260} />
            </Card>
          </div>

          <Card className={styles.volumeCard}>
            <div className={styles.chartSkeletonHead}>
              <SkeletonBlock width="42%" height={14} />
              <SkeletonBlock width="52%" height={12} />
            </div>
            <SkeletonBlock width="100%" height={260} />
          </Card>

          <Card className={styles.tableCard} contentClassName={styles.tableCard}>
            <div className={styles.tableSkeleton} aria-hidden>
              <div className={styles.tableSkeletonHead}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonBlock key={index} width="70%" height={12} />
                ))}
              </div>

              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <div key={rowIndex} className={styles.tableSkeletonRow}>
                  <SkeletonBlock width="56%" height={16} />
                  <SkeletonBlock width="44%" height={16} />
                  <SkeletonBlock width="54%" height={22} borderRadius={999} />
                  <SkeletonBlock width="40%" height={16} />
                  <SkeletonBlock width="46%" height={16} />
                  <SkeletonBlock width="58%" height={16} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageShell>
    )
  }

  const totalTxVolume = data.transactions.reduce((sum, tx) => sum + tx.valueUsd, 0)
  const completedTransactions = data.transactions.filter((tx) => tx.status === 'Completed').length
  const completionRate = data.transactions.length
    ? (completedTransactions / data.transactions.length) * 100
    : 0
  const avgAssetChange =
    data.assets.length > 0
      ? data.assets.reduce((sum, asset) => sum + asset.change24hPct, 0) / data.assets.length
      : 0
  const topTwoAllocation = [...data.assets]
    .sort((left, right) => right.allocationPct - left.allocationPct)
    .slice(0, 2)
    .reduce((sum, asset) => sum + asset.allocationPct, 0)

  const chainExposureMap = data.assets.reduce<Record<string, number>>((acc, asset) => {
    acc[asset.chain] = (acc[asset.chain] ?? 0) + asset.valueUsd
    return acc
  }, {})

  const chainExposure = Object.entries(chainExposureMap)
    .map(([chain, valueUsd]) => ({ chain, valueUsd }))
    .sort((left, right) => right.valueUsd - left.valueUsd)

  const riskMap = data.assets.reduce<Record<string, number>>((acc, asset) => {
    acc[asset.riskTag] = (acc[asset.riskTag] ?? 0) + asset.valueUsd
    return acc
  }, {})

  const riskPalette = {
    Low: '#22c55e',
    Medium: '#f59e0b',
    High: '#ef4444',
  } as const

  const riskDistribution = Object.entries(riskMap).map(([risk, valueUsd]) => ({
    risk,
    valueUsd,
    color: riskPalette[risk as keyof typeof riskPalette] ?? '#7c7cff',
  }))

  const volumeTrend = buildDailyVolume(data.transactions)

  const riskTone = {
    Low: 'success',
    Medium: 'warning',
    High: 'danger',
  } as const

  const assetColumns: DataTableColumn<Asset>[] = [
    {
      id: 'asset',
      header: 'Asset',
      renderCell: (asset) => (
        <div className={styles.assetCell}>
          <strong>{asset.symbol}</strong>
          <span className={styles.assetMeta}>{asset.name}</span>
        </div>
      ),
    },
    { id: 'chain', header: 'Chain', renderCell: (asset) => asset.chain },
    {
      id: 'risk',
      header: 'Risk',
      renderCell: (asset) => <StatusBadge tone={riskTone[asset.riskTag]}>{asset.riskTag}</StatusBadge>,
      align: 'right',
    },
    {
      id: 'allocation',
      header: 'Allocation',
      renderCell: (asset) => `${asset.allocationPct.toFixed(1)}%`,
      align: 'right',
    },
    {
      id: 'change',
      header: '24h%',
      renderCell: (asset) => (
        <span className={asset.change24hPct >= 0 ? styles.changeUp : styles.changeDown}>
          {formatPercent(asset.change24hPct)}
        </span>
      ),
      align: 'right',
    },
    {
      id: 'value',
      header: 'Value',
      renderCell: (asset) => formatCurrency(asset.valueUsd),
      align: 'right',
    },
  ]

  return (
    <PageShell
      title="Analytics"
      description="Portfolio intelligence view with concentration, execution quality, chain exposure, risk profile, and volume trend."
    >
      <div className={styles.layout}>
        <div className={styles.kpiGrid}>
          <Card>
            <p className={styles.kpiLabel}>Total transaction volume</p>
            <p className={styles.kpiValue}>{formatCurrency(totalTxVolume)}</p>
            <p className={styles.kpiMeta}>{data.transactions.length} operations in mock ledger</p>
          </Card>

          <Card>
            <p className={styles.kpiLabel}>Completion rate</p>
            <p className={styles.kpiValue}>{completionRate.toFixed(1)}%</p>
            <p className={styles.kpiMeta}>
              {completedTransactions}/{data.transactions.length} completed
            </p>
          </Card>

          <Card>
            <p className={styles.kpiLabel}>Average 24h asset move</p>
            <p className={styles.kpiValue}>{formatPercent(avgAssetChange)}</p>
            <p className={`${styles.kpiMeta} ${avgAssetChange >= 0 ? styles.positive : styles.negative}`}>
              {avgAssetChange >= 0 ? 'Positive momentum' : 'Negative momentum'}
            </p>
          </Card>

          <Card>
            <p className={styles.kpiLabel}>Top-2 concentration</p>
            <p className={styles.kpiValue}>{topTwoAllocation.toFixed(1)}%</p>
            <p className={styles.kpiMeta}>Share controlled by two largest assets</p>
          </Card>
        </div>

        <div className={styles.chartsGrid}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHead}>
              <h2 className={styles.chartTitle}>Chain Exposure</h2>
              <p className={styles.chartMeta}>Value distribution by execution network</p>
            </div>
            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chainExposure} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="chain" tick={{ fill: 'var(--text-2)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: 'var(--text-2)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                    width={48}
                  />
                  <Tooltip
                    cursor={false}
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                  <Bar dataKey="valueUsd" fill="var(--accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={styles.chartCard}>
            <div className={styles.chartHead}>
              <h2 className={styles.chartTitle}>Risk Mix</h2>
              <p className={styles.chartMeta}>Portfolio value grouped by risk tag</p>
            </div>
            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    dataKey="valueUsd"
                    nameKey="risk"
                    cx="50%"
                    cy="50%"
                    innerRadius={56}
                    outerRadius={90}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {riskDistribution.map((entry) => (
                      <Cell key={entry.risk} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className={styles.volumeCard}>
          <div className={styles.chartHead}>
            <h2 className={styles.chartTitle}>Daily Transaction Volume Trend</h2>
            <p className={styles.chartMeta}>Aggregated transaction value by date</p>
          </div>
          <div className={styles.chartArea}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeTrend} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-2)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: 'var(--text-2)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                  width={48}
                />
                <Tooltip
                  cursor={{ stroke: 'var(--accent)', strokeOpacity: 0.25 }}
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={tooltipContentStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                />
                <Line
                  type="monotone"
                  dataKey="valueUsd"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--accent)' }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={styles.tableCard} contentClassName={styles.tableCard}>
          <DataTable columns={assetColumns} rows={data.assets} rowKey={(asset) => asset.id} />
        </Card>
      </div>
    </PageShell>
  )
}

function buildDailyVolume(transactions: Transaction[]) {
  const map = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const day = new Date(transaction.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

    acc[day] = (acc[day] ?? 0) + transaction.valueUsd
    return acc
  }, {})

  return Object.entries(map).map(([date, valueUsd]) => ({ date, valueUsd }))
}
