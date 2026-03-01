import styles from './dashboard-skeleton.module.scss'

export function DashboardSkeleton() {
  return (
    <section className={styles.page} aria-label="Loading dashboard">
      <div className={`${styles.block} ${styles.overview}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.tile} />
        ))}
      </div>

      <div className={`${styles.block} ${styles.accounts}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.tile} />
        ))}
      </div>

      <div className={styles.insights}>
        <div className={`${styles.block} ${styles.chart}`} />
        <div className={`${styles.block} ${styles.list}`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.line} />
          ))}
        </div>
      </div>
    </section>
  )
}
