import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './SkeletonBlock.module.scss'

type SkeletonBlockProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export function SkeletonBlock({
  width = '100%',
  height = '16px',
  borderRadius = 10,
}: SkeletonBlockProps) {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
      duration={1.5}
    >
      <span className={styles.root} aria-hidden>
        <Skeleton width={width} height={height} borderRadius={borderRadius} className={styles.block} />
      </span>
    </SkeletonTheme>
  )
}
