import { SelectField } from '../../../../shared/ui/select-field'
import type { PreferencesSettingsValue } from '../../lib/settings-storage'
import styles from './preferences-settings.module.scss'

type PreferencesSettingsProps = {
  value: PreferencesSettingsValue
  onChange: <TField extends keyof PreferencesSettingsValue>(
    field: TField,
    fieldValue: PreferencesSettingsValue[TField],
  ) => void
}

export function PreferencesSettings({
  value,
  onChange,
}: PreferencesSettingsProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.head}>
        <h3 className={styles.title}>Preferences</h3>
        <p className={styles.meta}>Currency and formatting options</p>
      </header>

      <div className={styles.grid}>
        <SelectField
          label="Currency"
          value={value.currency}
          onChange={(next) =>
            onChange('currency', next as PreferencesSettingsValue['currency'])
          }
          options={[
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
          ]}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Number format"
          value={value.numberFormat}
          onChange={(next) =>
            onChange('numberFormat', next as PreferencesSettingsValue['numberFormat'])
          }
          options={[
            { value: '1,234.56', label: '1,234.56' },
            { value: '1 234,56', label: '1 234,56' },
          ]}
          wrapperClassName={styles.field}
        />

        <SelectField
          label="Date format"
          value={value.dateFormat}
          onChange={(next) =>
            onChange('dateFormat', next as PreferencesSettingsValue['dateFormat'])
          }
          options={[
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          ]}
          wrapperClassName={styles.field}
        />
      </div>
    </section>
  )
}
