import { SectionSkeleton } from '../../../../shared/ui/section-skeleton'
import styles from './cards-skeleton.module.scss'

export function CardsSkeleton() {
  return (
    <div className={styles.grid}>
      <SectionSkeleton rows={3} />
      <SectionSkeleton rows={3} />
    </div>
  )
}
