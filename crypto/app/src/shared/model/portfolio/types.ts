export type AssetChain = 'Ethereum' | 'Arbitrum' | 'Polygon' | 'Base' | 'Solana'

export type AssetRiskTag = 'Low' | 'Medium' | 'High'

export type Asset = {
  id: string
  symbol: string
  name: string
  balance: number
  priceUsd: number
  valueUsd: number
  change24hPct: number
  allocationPct: number
  chain: AssetChain
  riskTag: AssetRiskTag
}

export type PortfolioPerformer = {
  symbol: string
  change24hPct: number
}

export type PortfolioSummary = {
  totalValueUsd: number
  change24hUsd: number
  change24hPct: number
  totalAssetsCount: number
  bestPerformer: PortfolioPerformer | null
  worstPerformer: PortfolioPerformer | null
}

export type TransactionType = 'Buy' | 'Sell' | 'Swap' | 'Transfer'

export type TransactionStatus = 'Completed' | 'Pending' | 'Failed'

export type Transaction = {
  id: string
  type: TransactionType
  status: TransactionStatus
  assetSymbol: string
  amount: number
  valueUsd: number
  chain: AssetChain
  addressShort: string
  timestamp: string
  hashShort: string
}

export type ChartPeriod = '1D' | '7D' | '1M' | '1Y'

export type ChartPoint = {
  timeLabel: string
  valueUsd: number
}

export type ChartSeriesMap = Record<ChartPeriod, ChartPoint[]>
