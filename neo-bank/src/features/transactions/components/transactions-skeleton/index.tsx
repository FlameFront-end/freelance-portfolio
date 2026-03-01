import { SectionSkeleton } from '../../../../shared/ui/section-skeleton'
import styles from './transactions-skeleton.module.scss'

export function TransactionsSkeleton() {
  return (
    <div className={styles.layout}>
      <SectionSkeleton rows={1} />
      <SectionSkeleton rows={8} />
    </div>
  )
}
