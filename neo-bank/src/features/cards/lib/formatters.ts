import type { CardStatus, TransactionType } from '../../../entities/finance/model/types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

export const formatCurrency = (value: number): string => currencyFormatter.format(value)

export const formatShortDate = (value: string): string =>
  shortDateFormatter.format(new Date(value))

export const formatSignedAmount = (
  amount: number,
  transactionType: TransactionType,
): string => `${transactionType === 'Income' ? '+' : '-'}${formatCurrency(amount)}`

export const getNextCardStatus = (status: CardStatus): CardStatus =>
  status === 'Active' ? 'Frozen' : 'Active'
