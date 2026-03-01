import type {
  TransactionStatus,
  TransactionType,
} from '../../../entities/finance/model/types'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export const formatDate = (value: string): string =>
  dateFormatter.format(new Date(value))

export const formatCurrency = (value: number): string => currencyFormatter.format(value)

export const formatSignedAmount = (
  amount: number,
  transactionType: TransactionType,
): string => `${transactionType === 'Income' ? '+' : '-'}${formatCurrency(amount)}`

export const getStatusClassName = (
  status: TransactionStatus,
  doneClassName: string,
  pendingClassName: string,
): string => (status === 'Completed' ? doneClassName : pendingClassName)
