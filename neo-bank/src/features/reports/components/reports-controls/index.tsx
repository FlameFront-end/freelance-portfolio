import type { Account } from '../../../../entities/finance/model/types'
import type { MonthOption } from '../../../../entities/finance/model/selectors'
import { SelectField } from '../../../../shared/ui/select-field'
import type { AccountScope } from '../../lib/report-data'
import styles from './reports-controls.module.scss'

type ReportsControlsProps = {
  monthOptions: MonthOption[]
  selectedMonth: string
  selectedAccount: AccountScope
  accounts: Account[]
  onMonthChange: (monthKey: string) => void
  onAccountChange: (accountScope: AccountScope) => void
}

export function ReportsControls({
  monthOptions,
  selectedMonth,
  selectedAccount,
  accounts,
  onMonthChange,
  onAccountChange,
}: ReportsControlsProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.grid}>
        <SelectField
          label="Month"
          value={selectedMonth}
          onChange={onMonthChange}
          options={monthOptions}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Account"
          value={selectedAccount}
          onChange={(value) => onAccountChange(value as AccountScope)}
          options={[
            { value: 'all', label: 'All accounts' },
            ...accounts.map((account) => ({ value: account.id, label: account.name })),
          ]}
          wrapperClassName={styles.field}
        />
      </div>
    </section>
  )
}
