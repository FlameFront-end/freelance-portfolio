import { Link } from 'react-router-dom'
import type { Account, Transaction } from '../../../../entities/finance/model/types'
import { formatShortDate, formatSignedAmount } from '../../lib/formatters'
import styles from './recent-transactions.module.scss'

type RecentTransactionsProps = {
  transactions: Transaction[]
  accounts: Account[]
  monthLabel: string
}

export function RecentTransactions({
  transactions,
  accounts,
  monthLabel,
}: RecentTransactionsProps) {
  const accountNameById = new Map(accounts.map((account) => [account.id, account.name]))

  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>Recent Transactions</h2>
          <p className={styles.meta}>{monthLabel}</p>
        </div>
        <Link className={styles.action} to="/transactions">
          View all
        </Link>
      </div>

      <div className={styles.list}>
        {transactions.map((transaction) => (
          <article key={transaction.id} className={styles.row}>
            <div className={styles.main}>
              <p className={styles.merchant}>{transaction.merchant}</p>
              <p className={styles.secondary}>
                {transaction.category} |{' '}
                {accountNameById.get(transaction.accountId) ?? 'Unknown account'}
              </p>
            </div>

            <div className={styles.side}>
              <p
                className={`numbers ${styles.amount} ${
                  transaction.type === 'Income' ? styles.income : styles.expense
                }`}
              >
                {formatSignedAmount(transaction.amount, transaction.type)}
              </p>
              <p className={styles.secondary}>{formatShortDate(transaction.date)}</p>
            </div>

            <span
              className={`${styles.status} ${
                transaction.status === 'Completed'
                  ? styles.statusDone
                  : styles.statusPending
              }`}
            >
              {transaction.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
