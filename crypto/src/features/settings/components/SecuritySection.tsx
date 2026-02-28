import { useState } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { SelectField } from '../../../shared/ui/select-field/SelectField'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import styles from './SecuritySection.module.scss'

type Session = {
  id: string
  device: string
  location: string
  active: string
  current?: boolean
}

const sessionsMock: Session[] = [
  { id: 's-1', device: 'Chrome on macOS', location: 'Singapore', active: 'Active now', current: true },
  { id: 's-2', device: 'Safari on iPhone', location: 'Tokyo', active: '7 minutes ago' },
  { id: 's-3', device: 'Edge on Windows', location: 'Berlin', active: '2 hours ago' },
]

export function SecuritySection() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [addressWhitelistEnabled, setAddressWhitelistEnabled] = useState(false)

  return (
    <Card className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>Security</h2>
        <p className={styles.description}>UI-only controls for hardening account and transaction safety.</p>
      </header>

      <div className={styles.controls}>
        <SelectField
          label="Session timeout"
          defaultValue="30"
          options={[
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' },
            { value: '240', label: '4 hours' },
          ]}
        />

        <SelectField
          label="Approval threshold"
          defaultValue="5000"
          options={[
            { value: '1000', label: '$1,000' },
            { value: '5000', label: '$5,000' },
            { value: '10000', label: '$10,000' },
            { value: '25000', label: '$25,000' },
          ]}
        />
      </div>

      <div className={styles.sessions}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Two-factor authentication</span>
          <Button
            size="sm"
            variant={twoFactorEnabled ? 'primary' : 'ghost'}
            onClick={() => setTwoFactorEnabled((current) => !current)}
          >
            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Address whitelist</span>
          <Button
            size="sm"
            variant={addressWhitelistEnabled ? 'primary' : 'ghost'}
            onClick={() => setAddressWhitelistEnabled((current) => !current)}
          >
            {addressWhitelistEnabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        <span className={styles.sessionsTitle}>Active sessions</span>
        {sessionsMock.map((session) => (
          <div key={session.id} className={styles.sessionItem}>
            <div className={styles.sessionMain}>
              <span className={styles.device}>{session.device}</span>
              <span className={styles.meta}>
                {session.location} • {session.active}
              </span>
            </div>

            {session.current ? (
              <StatusBadge tone="success">Current</StatusBadge>
            ) : (
              <Button size="sm" variant="ghost">
                Revoke
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button size="sm">Save security settings</Button>
      </div>
    </Card>
  )
}
