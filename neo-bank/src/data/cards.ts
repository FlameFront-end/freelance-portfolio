import type { Card } from '../entities/finance/model/types'

export const cards: Card[] = [
  {
    id: 'card_virtual',
    type: 'Virtual',
    last4: '2371',
    expiry: '08/29',
    status: 'Active',
    spendingLimit: 2500,
    currency: 'USD',
  },
  {
    id: 'card_physical',
    type: 'Physical',
    last4: '9230',
    expiry: '11/28',
    status: 'Frozen',
    spendingLimit: 4000,
    currency: 'USD',
  },
]
