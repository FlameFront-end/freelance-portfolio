import type { Account, Transaction } from '../../../../entities/finance/model/types'
import {
  formatDate,
  formatSignedAmount,
  getStatusClassName,
} from '../../lib/formatters'
import styles from './transactions-mobile-cards.module.scss'

type TransactionsMobileCardsProps = {
  transactions: Transaction[]
  accounts: Account[]
}

export function TransactionsMobileCards({
  transactions,
  accounts,
}: TransactionsMobileCardsProps) {
  const accountNameById = new Map(accounts.map((account) => [account.id, account.name]))

  return (
    <section className={styles.list}>
      {transactions.length === 0 ? (
        <div className={styles.empty}>No transactions for current filters.</div>
      ) : (
        transactions.map((transaction) => (
          <article key={transaction.id} className={styles.card}>
            <div className={styles.row}>
              <p className={styles.merchant}>{transaction.merchant}</p>
              <p
                className={`numbers ${styles.amount} ${
                  transaction.type === 'Income' ? styles.income : styles.expense
                }`}
              >
                {formatSignedAmount(transaction.amount, transaction.type)}
              </p>
            </div>

            <div className={styles.row}>
              <p className={styles.meta}>{formatDate(transaction.date)}</p>
              <span
                className={`${styles.status} ${getStatusClassName(
                  transaction.status,
                  styles.statusDone,
                  styles.statusPending,
                )}`}
              >
                {transaction.status}
              </span>
            </div>

            <p className={styles.meta}>
              {transaction.category} | {accountNameById.get(transaction.accountId) ?? 'Unknown'}
            </p>
          </article>
        ))
      )}
    </section>
  )
}
