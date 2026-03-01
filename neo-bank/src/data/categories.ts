import type { Category } from '../entities/finance/model/types'

export const categories: Category[] = [
  { id: 'cat_food', name: 'Food', color: '#22C55E', monthlyLimit: 800 },
  { id: 'cat_travel', name: 'Travel', color: '#0EA5E9', monthlyLimit: 600 },
  { id: 'cat_rent', name: 'Rent', color: '#F97316', monthlyLimit: 2200 },
  {
    id: 'cat_subscriptions',
    name: 'Subscriptions',
    color: '#A855F7',
    monthlyLimit: 180,
  },
  { id: 'cat_shopping', name: 'Shopping', color: '#EC4899', monthlyLimit: 700 },
  { id: 'cat_other', name: 'Other', color: '#94A3B8', monthlyLimit: 450 },
]
