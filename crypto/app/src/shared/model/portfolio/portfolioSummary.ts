import type { PortfolioSummary } from './types'

export const portfolioSummaryMock: PortfolioSummary = {
  totalValueUsd: 153585,
  change24hUsd: 1840,
  change24hPct: 1.21,
  totalAssetsCount: 6,
  bestPerformer: {
    symbol: 'SOL',
    change24hPct: 7.9,
  },
  worstPerformer: {
    symbol: 'ARB',
    change24hPct: -3.5,
  },
}

export const emptyPortfolioSummary: PortfolioSummary = {
  totalValueUsd: 0,
  change24hUsd: 0,
  change24hPct: 0,
  totalAssetsCount: 0,
  bestPerformer: null,
  worstPerformer: null,
}
