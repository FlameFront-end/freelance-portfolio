import { FolderSearch } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './EmptyState.module.scss'

type EmptyStateProps = {
  title?: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  title = 'No data available',
  description = 'Try changing filters or add new data.',
  action,
}: EmptyStateProps) {
  return (
    <div className={styles.root} role="status">
      <FolderSearch size={24} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action ?? null}
    </div>
  )
}
