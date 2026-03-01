import type { Account } from '../../../../entities/finance/model/types'
import { formatCurrency } from '../../lib/formatters'
import styles from './accounts-section.module.scss'

type AccountsSectionProps = {
  accounts: Account[]
}

const accountTypeLabel: Record<Account['type'], string> = {
  checking: 'Checking',
  savings: 'Savings',
  investment: 'Investment',
}

export function AccountsSection({ accounts }: AccountsSectionProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.head}>
        <h2 className={styles.title}>Accounts</h2>
        <p className={styles.meta}>{accounts.length} linked</p>
      </div>

      <div className={styles.grid}>
        {accounts.map((account) => (
          <article key={account.id} className={styles.card}>
            <p className={styles.name}>{account.name}</p>
            <p className={`numbers ${styles.balance}`}>
              {formatCurrency(account.balance)}
            </p>
            <p className={styles.type}>{accountTypeLabel[account.type]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
