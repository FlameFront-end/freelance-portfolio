import type {
  Account,
  Category,
  CategoryName,
  TransactionType,
} from '../../../../entities/finance/model/types'
import { SelectField } from '../../../../shared/ui/select-field'
import type { DateRangePreset } from '../../lib/filters'
import styles from './transactions-filters.module.scss'

type TransactionsFiltersProps = {
  datePreset: DateRangePreset
  customFrom: string
  customTo: string
  accountId: string
  category: '' | CategoryName
  type: '' | TransactionType
  accounts: Account[]
  categories: Category[]
  onDatePresetChange: (value: DateRangePreset) => void
  onCustomFromChange: (value: string) => void
  onCustomToChange: (value: string) => void
  onAccountIdChange: (value: string) => void
  onCategoryChange: (value: '' | CategoryName) => void
  onTypeChange: (value: '' | TransactionType) => void
}

export function TransactionsFilters({
  datePreset,
  customFrom,
  customTo,
  accountId,
  category,
  type,
  accounts,
  categories,
  onDatePresetChange,
  onCustomFromChange,
  onCustomToChange,
  onAccountIdChange,
  onCategoryChange,
  onTypeChange,
}: TransactionsFiltersProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.grid}>
        <SelectField
          label="Date range"
          value={datePreset}
          onChange={(value) => onDatePresetChange(value as DateRangePreset)}
          options={[
            { value: 'this-month', label: 'This month' },
            { value: 'last-month', label: 'Last month' },
            { value: 'custom', label: 'Custom' },
          ]}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Account"
          value={accountId}
          onChange={onAccountIdChange}
          options={[
            { value: '', label: 'All accounts' },
            ...accounts.map((account) => ({
              value: account.id,
              label: account.name,
            })),
          ]}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Category"
          value={category}
          onChange={(value) => onCategoryChange(value as '' | CategoryName)}
          options={[
            { value: '', label: 'All categories' },
            ...categories.map((item) => ({ value: item.name, label: item.name })),
          ]}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Type"
          value={type}
          onChange={(value) => onTypeChange(value as '' | TransactionType)}
          options={[
            { value: '', label: 'All types' },
            { value: 'Income', label: 'Income' },
            { value: 'Expense', label: 'Expense' },
          ]}
          wrapperClassName={styles.field}
        />
      </div>

      {datePreset === 'custom' ? (
        <div className={styles.customRange}>
          <label className={styles.field}>
            <span>From</span>
            <input
              type="date"
              value={customFrom}
              onChange={(event) => onCustomFromChange(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>To</span>
            <input
              type="date"
              value={customTo}
              onChange={(event) => onCustomToChange(event.target.value)}
            />
          </label>
        </div>
      ) : null}
    </section>
  )
}
