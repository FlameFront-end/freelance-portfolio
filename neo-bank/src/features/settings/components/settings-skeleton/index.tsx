import { SectionSkeleton } from '../../../../shared/ui/section-skeleton'
import styles from './settings-skeleton.module.scss'

export function SettingsSkeleton() {
  return (
    <div className={styles.layout}>
      <SectionSkeleton rows={3} />
      <SectionSkeleton rows={3} />
      <SectionSkeleton rows={2} />
    </div>
  )
}
