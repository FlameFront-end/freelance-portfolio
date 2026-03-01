import type { Account, Category, Transaction } from './types'

export type MonthOption = {
  value: string
  label: string
}

export const getTotalBalance = (accounts: Account[]): number =>
  accounts.reduce((sum, account) => sum + account.balance, 0)

export const getMonthKey = (dateString: string): string => dateString.slice(0, 7)

export const getAvailableMonths = (transactions: Transaction[]): string[] =>
  [...new Set(transactions.map((transaction) => getMonthKey(transaction.date)))].sort(
    (left, right) => right.localeCompare(left),
  )

export const getMonthLabel = (monthKey: string, locale = 'en-US'): string => {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1, 1)

  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
}

export const getMonthOptions = (transactions: Transaction[]): MonthOption[] =>
  getAvailableMonths(transactions).map((monthKey) => ({
    value: monthKey,
    label: getMonthLabel(monthKey),
  }))

export const getTransactionsForMonth = (
  transactions: Transaction[],
  monthKey: string,
): Transaction[] =>
  transactions.filter((transaction) => getMonthKey(transaction.date) === monthKey)

export const getMonthlyTotals = (
  transactions: Transaction[],
  monthKey: string,
): { income: number; expenses: number; net: number } => {
  const monthTransactions = getTransactionsForMonth(transactions, monthKey)

  const totals = monthTransactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === 'Income') {
        accumulator.income += transaction.amount
      } else {
        accumulator.expenses += transaction.amount
      }

      return accumulator
    },
    { income: 0, expenses: 0 },
  )

  return {
    income: totals.income,
    expenses: totals.expenses,
    net: totals.income - totals.expenses,
  }
}

export const getRecentTransactions = (
  transactions: Transaction[],
  limit = 8,
): Transaction[] =>
  [...transactions]
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
    .slice(0, limit)

export const getSpendingByCategory = (
  transactions: Transaction[],
  categories: Category[],
  monthKey: string,
): Array<{ category: Category['name']; color: string; amount: number; percent: number }> => {
  const monthTransactions = getTransactionsForMonth(transactions, monthKey).filter(
    (transaction) => transaction.type === 'Expense',
  )

  const totalExpenses = monthTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  )

  return categories.map((category) => {
    const amount = monthTransactions
      .filter((transaction) => transaction.category === category.name)
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    const percent = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0

    return {
      category: category.name,
      color: category.color,
      amount,
      percent,
    }
  })
}
