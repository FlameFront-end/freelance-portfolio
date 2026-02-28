import { useState } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { SelectField } from '../../../shared/ui/select-field/SelectField'
import styles from './PreferencesSection.module.scss'

export function PreferencesSection() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [compactNumbersEnabled, setCompactNumbersEnabled] = useState(false)

  return (
    <Card className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>Preferences</h2>
        <p className={styles.description}>UI-only controls for display and workspace behavior.</p>
      </header>

      <div className={styles.grid}>
        <SelectField
          label="Default network"
          defaultValue="ethereum"
          options={[
            { value: 'ethereum', label: 'Ethereum Mainnet' },
            { value: 'arbitrum', label: 'Arbitrum' },
            { value: 'polygon', label: 'Polygon' },
            { value: 'base', label: 'Base' },
          ]}
        />

        <SelectField
          label="Default period"
          defaultValue="7d"
          options={[
            { value: '1d', label: '1D' },
            { value: '7d', label: '7D' },
            { value: '1m', label: '1M' },
            { value: '1y', label: '1Y' },
          ]}
        />

        <SelectField
          label="Timezone"
          defaultValue="utc+8"
          options={[
            { value: 'utc-5', label: 'UTC-5 (New York)' },
            { value: 'utc+0', label: 'UTC+0 (London)' },
            { value: 'utc+8', label: 'UTC+8 (Singapore)' },
          ]}
        />

        <SelectField
          label="Currency display"
          defaultValue="usd"
          options={[
            { value: 'usd', label: 'USD' },
            { value: 'eur', label: 'EUR' },
            { value: 'sgd', label: 'SGD' },
          ]}
        />
      </div>

      <div className={styles.toggles}>
        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Notifications</span>
          <Button
            size="sm"
            variant={notificationsEnabled ? 'primary' : 'ghost'}
            onClick={() => setNotificationsEnabled((current) => !current)}
          >
            {notificationsEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Compact numbers</span>
          <Button
            size="sm"
            variant={compactNumbersEnabled ? 'primary' : 'ghost'}
            onClick={() => setCompactNumbersEnabled((current) => !current)}
          >
            {compactNumbersEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>
      </div>

      <div className={styles.actions}>
        <Button size="sm">Save preferences</Button>
      </div>
    </Card>
  )
}
