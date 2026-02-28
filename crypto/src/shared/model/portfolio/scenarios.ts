import { assetsMock } from './assets'
import { chartSeriesMock, emptyChartSeries } from './chartSeries'
import { emptyPortfolioSummary, portfolioSummaryMock } from './portfolioSummary'
import { transactionsMock } from './transactions'
import type { Asset, ChartSeriesMap, PortfolioSummary, Transaction } from './types'

export type MockScenarioKey = 'default' | 'empty' | 'error'

export type MockScenarioStatus = 'ready' | 'empty' | 'error'

export type MockDataBundle = {
  assets: Asset[]
  portfolioSummary: PortfolioSummary
  transactions: Transaction[]
  chartSeries: ChartSeriesMap
}

export type MockScenario = {
  key: MockScenarioKey
  status: MockScenarioStatus
  data: MockDataBundle
  errorMessage?: string
}

const emptyDataBundle: MockDataBundle = {
  assets: [],
  portfolioSummary: emptyPortfolioSummary,
  transactions: [],
  chartSeries: emptyChartSeries,
}

export const mockScenarios: Record<MockScenarioKey, MockScenario> = {
  default: {
    key: 'default',
    status: 'ready',
    data: {
      assets: assetsMock,
      portfolioSummary: portfolioSummaryMock,
      transactions: transactionsMock,
      chartSeries: chartSeriesMock,
    },
  },
  empty: {
    key: 'empty',
    status: 'empty',
    data: emptyDataBundle,
  },
  error: {
    key: 'error',
    status: 'error',
    data: emptyDataBundle,
    errorMessage: 'Mock provider timeout: unable to fetch portfolio data.',
  },
}

export const activeMockScenario: MockScenario = mockScenarios.default
