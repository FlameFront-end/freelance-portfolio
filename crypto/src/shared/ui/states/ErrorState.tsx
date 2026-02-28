import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './ErrorState.module.scss'

type ErrorStateProps = {
  title?: string
  description?: string
  action?: ReactNode
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The block could not be rendered with the current data source.',
  action,
}: ErrorStateProps) {
  return (
    <div className={styles.root} role="alert">
      <AlertTriangle size={24} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action ?? null}
    </div>
  )
}
