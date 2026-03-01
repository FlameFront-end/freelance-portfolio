import type {
  Account,
  Category,
  Transaction,
} from '../../../entities/finance/model/types'

export type AccountScope = 'all' | Account['id']

export type DailyBalancePoint = {
  day: number
  label: string
  balance: number
}

export type CategoryExpensePoint = {
  category: Category['name']
  amount: number
  color: string
}

const padDay = (value: number): string => String(value).padStart(2, '0')

const getMonthTransactions = (
  transactions: Transaction[],
  monthKey: string,
  accountScope: AccountScope,
): Transaction[] =>
  transactions.filter((transaction) => {
    if (!transaction.date.startsWith(monthKey)) {
      return false
    }

    if (accountScope !== 'all' && transaction.accountId !== accountScope) {
      return false
    }

    return true
  })

const getMonthNet = (monthTransactions: Transaction[]): number =>
  monthTransactions.reduce((sum, transaction) => {
    return sum + (transaction.type === 'Income' ? transaction.amount : -transaction.amount)
  }, 0)

const getCurrentBalance = (accounts: Account[], accountScope: AccountScope): number => {
  if (accountScope === 'all') {
    return accounts.reduce((sum, account) => sum + account.balance, 0)
  }

  return accounts.find((account) => account.id === accountScope)?.balance ?? 0
}

export const getDailyBalanceSeries = (
  accounts: Account[],
  transactions: Transaction[],
  monthKey: string,
  accountScope: AccountScope,
): DailyBalancePoint[] => {
  const [year, month] = monthKey.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()
  const monthTransactions = getMonthTransactions(transactions, monthKey, accountScope)
  const monthNet = getMonthNet(monthTransactions)
  const currentBalance = getCurrentBalance(accounts, accountScope)
  let runningBalance = currentBalance - monthNet

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const dayKey = `${monthKey}-${padDay(day)}`
    const dayNet = monthTransactions
      .filter((transaction) => transaction.date === dayKey)
      .reduce(
        (sum, transaction) =>
          sum + (transaction.type === 'Income' ? transaction.amount : -transaction.amount),
        0,
      )

    runningBalance += dayNet

    return {
      day,
      label: String(day),
      balance: Number(runningBalance.toFixed(2)),
    }
  })
}

export const getCategoryExpenseSeries = (
  categories: Category[],
  transactions: Transaction[],
  monthKey: string,
  accountScope: AccountScope,
): CategoryExpensePoint[] => {
  const monthTransactions = getMonthTransactions(transactions, monthKey, accountScope).filter(
    (transaction) => transaction.type === 'Expense',
  )

  return categories.map((category) => {
    const amount = monthTransactions
      .filter((transaction) => transaction.category === category.name)
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    return {
      category: category.name,
      amount: Number(amount.toFixed(2)),
      color: category.color,
    }
  })
}

export const getReportSummary = (
  transactions: Transaction[],
  monthKey: string,
  accountScope: AccountScope,
): { income: number; expenses: number; net: number } => {
  const monthTransactions = getMonthTransactions(transactions, monthKey, accountScope)

  const income = monthTransactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expenses = monthTransactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  return {
    income: Number(income.toFixed(2)),
    expenses: Number(expenses.toFixed(2)),
    net: Number((income - expenses).toFixed(2)),
  }
}
