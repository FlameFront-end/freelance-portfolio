import styles from './section-skeleton.module.scss'

type SectionSkeletonProps = {
  rows?: number
}

export function SectionSkeleton({ rows = 4 }: SectionSkeletonProps) {
  return (
    <section className={styles.panel} aria-label="Loading section">
      <div className={styles.header} />
      <div className={styles.list}>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className={styles.row} />
        ))}
      </div>
    </section>
  )
}
