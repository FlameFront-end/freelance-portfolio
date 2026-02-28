import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './StatusBadge.module.scss'

type StatusBadgeTone = 'success' | 'warning' | 'danger' | 'neutral'

type StatusBadgeProps = {
  tone?: StatusBadgeTone
  children: ReactNode
  className?: string
}

export function StatusBadge({ tone = 'neutral', children, className }: StatusBadgeProps) {
  return <span className={cn(styles.badge, styles[tone], className)}>{children}</span>
}
