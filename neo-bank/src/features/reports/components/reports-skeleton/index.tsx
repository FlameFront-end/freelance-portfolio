import { SectionSkeleton } from '../../../../shared/ui/section-skeleton'
import styles from './reports-skeleton.module.scss'

export function ReportsSkeleton() {
  return (
    <div className={styles.layout}>
      <SectionSkeleton rows={1} />
      <div className={styles.grid}>
        <SectionSkeleton rows={6} />
        <SectionSkeleton rows={6} />
      </div>
    </div>
  )
}
