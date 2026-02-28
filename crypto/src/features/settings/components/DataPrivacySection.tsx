import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import styles from './DataPrivacySection.module.scss'

export function DataPrivacySection() {
  return (
    <Card className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>Data & Privacy</h2>
        <p className={styles.description}>Export and privacy controls for portfolio mock workspace.</p>
      </header>

      <div className={styles.group}>
        <span className={styles.groupTitle}>Data management</span>

        <div className={styles.row}>
          <div className={styles.main}>
            <span className={styles.label}>Export portfolio snapshot</span>
            <span className={styles.meta}>JSON / CSV archive with current mock balances and transactions</span>
          </div>
          <Button size="sm">Export</Button>
        </div>

        <div className={styles.row}>
          <div className={styles.main}>
            <span className={styles.label}>Backup configuration</span>
            <span className={styles.meta}>Create encrypted local backup of UI preferences</span>
          </div>
          <Button size="sm" variant="ghost">
            Backup
          </Button>
        </div>
      </div>

      <div className={styles.phrase}>
        <p className={styles.phraseTitle}>Recovery phrase preview (UI-only)</p>
        <p className={styles.phraseValue}>alpha • lunar • switch • orbit • velvet • sigma • anchor • zero</p>
      </div>

      <div className={styles.danger}>
        <div>
          <p className={styles.dangerTitle}>Danger zone</p>
          <p className={styles.dangerMeta}>Reset all local mock settings and clear saved theme/preferences.</p>
        </div>
        <Button size="sm" variant="ghost">
          Reset data
        </Button>
      </div>
    </Card>
  )
}
