import { UserRound } from 'lucide-react'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import { TextInput } from '../../../shared/ui/text-input/TextInput'
import styles from './ProfileSection.module.scss'

export function ProfileSection() {
  return (
    <Card className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>Profile</h2>
        <p className={styles.description}>UI-only section for portfolio demo. No backend persistence.</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.avatar}>
          <span className={styles.avatarCircle}>
            <UserRound size={20} />
          </span>
          <span className={styles.avatarMeta}>Designer / Trader</span>
          <Button size="sm" variant="ghost">
            Change
          </Button>
        </div>

        <div>
          <div className={styles.fields}>
            <TextInput label="Full name" defaultValue="Jordan D." />
            <TextInput label="Email" defaultValue="jordan@concept.dev" />
            <TextInput label="Handle" defaultValue="@jordan-defi" />
            <TextInput label="Role" defaultValue="Portfolio Owner" />
          </div>

          <div className={styles.actions}>
            <Button size="sm">Save profile</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
