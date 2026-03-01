import type { ProfileSettingsValue } from '../../lib/settings-storage'
import styles from './profile-settings.module.scss'

type ProfileSettingsProps = {
  value: ProfileSettingsValue
  onChange: <TField extends keyof ProfileSettingsValue>(
    field: TField,
    fieldValue: ProfileSettingsValue[TField],
  ) => void
}

export function ProfileSettings({ value, onChange }: ProfileSettingsProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.head}>
        <h3 className={styles.title}>Profile</h3>
        <p className={styles.meta}>UI-only profile settings</p>
      </header>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Full name</span>
          <input
            value={value.fullName}
            onChange={(event) => onChange('fullName', event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            value={value.email}
            onChange={(event) => onChange('email', event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Phone</span>
          <input
            value={value.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
