import type {
  CategoryName,
  Transaction,
  TransactionType,
} from '../../../entities/finance/model/types'

export type DateRangePreset = 'this-month' | 'last-month' | 'custom'

export type TransactionFilters = {
  datePreset: DateRangePreset
  customFrom: string
  customTo: string
  accountId: string
  category: '' | CategoryName
  type: '' | TransactionType
}

type DateRange = {
  from: string
  to: string
}

const toIsoDate = (value: Date): string => value.toISOString().slice(0, 10)

const getMonthDateRange = (referenceDate: Date, monthOffset = 0): DateRange => {
  const start = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() + monthOffset,
    1,
  )
  const end = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() + monthOffset + 1,
    0,
  )

  return { from: toIsoDate(start), to: toIsoDate(end) }
}

export const getPresetDateRange = (
  preset: Exclude<DateRangePreset, 'custom'>,
  referenceDate: Date,
): DateRange =>
  preset === 'this-month'
    ? getMonthDateRange(referenceDate, 0)
    : getMonthDateRange(referenceDate, -1)

const getActiveDateRange = (
  filters: TransactionFilters,
  referenceDate: Date,
): DateRange => {
  if (filters.datePreset === 'custom') {
    return {
      from: filters.customFrom,
      to: filters.customTo,
    }
  }

  return getPresetDateRange(filters.datePreset, referenceDate)
}

export const filterTransactions = (
  source: Transaction[],
  filters: TransactionFilters,
  referenceDate: Date,
): Transaction[] => {
  const activeDateRange = getActiveDateRange(filters, referenceDate)

  return source
    .filter((transaction) => {
      if (activeDateRange.from && transaction.date < activeDateRange.from) {
        return false
      }

      if (activeDateRange.to && transaction.date > activeDateRange.to) {
        return false
      }

      if (filters.accountId && transaction.accountId !== filters.accountId) {
        return false
      }

      if (filters.category && transaction.category !== filters.category) {
        return false
      }

      if (filters.type && transaction.type !== filters.type) {
        return false
      }

      return true
    })
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
}
