import styles from './balance-overview.module.scss'
import { formatCurrency } from '../../lib/formatters'

type BalanceOverviewProps = {
  totalBalance: number
  income: number
  expenses: number
  net: number
  monthLabel: string
}

export function BalanceOverview({
  totalBalance,
  income,
  expenses,
  net,
  monthLabel,
}: BalanceOverviewProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <h2 className={styles.title}>Balance Overview</h2>
        <p className={styles.meta}>{monthLabel}</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <p className={styles.label}>Total Balance</p>
          <p className={`numbers ${styles.value}`}>{formatCurrency(totalBalance)}</p>
        </article>

        <article className={styles.card}>
          <p className={styles.label}>Monthly Income</p>
          <p className={`numbers ${styles.value} ${styles.positive}`}>
            {formatCurrency(income)}
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.label}>Monthly Expenses</p>
          <p className={`numbers ${styles.value} ${styles.negative}`}>
            {formatCurrency(expenses)}
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.label}>Net Change</p>
          <p
            className={`numbers ${styles.value} ${
              net >= 0 ? styles.positive : styles.negative
            }`}
          >
            {formatCurrency(net)}
          </p>
        </article>
      </div>
    </section>
  )
}
