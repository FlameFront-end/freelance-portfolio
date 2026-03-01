import type { Account } from '../entities/finance/model/types'

export const accounts: Account[] = [
  {
    id: 'acc_main',
    name: 'Main',
    balance: 12840.36,
    currency: 'USD',
    type: 'checking',
  },
  {
    id: 'acc_savings',
    name: 'Savings',
    balance: 8490.12,
    currency: 'USD',
    type: 'savings',
  },
  {
    id: 'acc_investment',
    name: 'Investment',
    balance: 3650.45,
    currency: 'USD',
    type: 'investment',
  },
]
