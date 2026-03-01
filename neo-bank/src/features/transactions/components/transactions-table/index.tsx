import type { Account, Transaction } from '../../../../entities/finance/model/types'
import {
  formatDate,
  formatSignedAmount,
  getStatusClassName,
} from '../../lib/formatters'
import styles from './transactions-table.module.scss'

type TransactionsTableProps = {
  transactions: Transaction[]
  accounts: Account[]
}

export function TransactionsTable({ transactions, accounts }: TransactionsTableProps) {
  const accountNameById = new Map(accounts.map((account) => [account.id, account.name]))

  return (
    <section className={styles.panel}>
      <div className={styles.scroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Category</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No transactions for current filters.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td className={styles.merchant}>{transaction.merchant}</td>
                  <td>{transaction.category}</td>
                  <td>{accountNameById.get(transaction.accountId) ?? 'Unknown'}</td>
                  <td
                    className={`numbers ${styles.amount} ${
                      transaction.type === 'Income' ? styles.income : styles.expense
                    }`}
                  >
                    {formatSignedAmount(transaction.amount, transaction.type)}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${getStatusClassName(
                        transaction.status,
                        styles.statusDone,
                        styles.statusPending,
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
