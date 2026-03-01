export type CurrencyCode = 'USD'

export type AccountType = 'checking' | 'savings' | 'investment'

export type CardType = 'Virtual' | 'Physical'
export type CardStatus = 'Active' | 'Frozen'

export type TransactionType = 'Income' | 'Expense'
export type TransactionStatus = 'Completed' | 'Pending'

export type CategoryName =
  | 'Food'
  | 'Travel'
  | 'Rent'
  | 'Subscriptions'
  | 'Shopping'
  | 'Other'

export interface Account {
  id: string
  name: string
  balance: number
  currency: CurrencyCode
  type: AccountType
}

export interface Card {
  id: string
  type: CardType
  last4: string
  expiry: string
  status: CardStatus
  spendingLimit: number
  currency: CurrencyCode
}

export interface Transaction {
  id: string
  date: string
  merchant: string
  category: CategoryName
  amount: number
  currency: CurrencyCode
  type: TransactionType
  status: TransactionStatus
  accountId: Account['id']
}

export interface Category {
  id: string
  name: CategoryName
  color: string
  monthlyLimit: number
}
