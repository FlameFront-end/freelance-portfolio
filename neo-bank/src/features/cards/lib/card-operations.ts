import type { Transaction } from '../../../entities/finance/model/types'

const cardTransactionMap: Record<string, string[]> = {
  card_virtual: ['txn_001', 'txn_004', 'txn_006', 'txn_011', 'txn_015', 'txn_023'],
  card_physical: ['txn_003', 'txn_005', 'txn_009', 'txn_014', 'txn_020', 'txn_022'],
}

export const getCardTransactions = (
  cardId: string,
  allTransactions: Transaction[],
  limit = 6,
): Transaction[] => {
  const includedIds = new Set(cardTransactionMap[cardId] ?? [])

  return allTransactions
    .filter((transaction) => includedIds.has(transaction.id))
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
    .slice(0, limit)
}
