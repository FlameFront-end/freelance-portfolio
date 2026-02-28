import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './Card.module.scss'

type CardProps<TAs extends ElementType> = {
  as?: TAs
  className?: string
  contentClassName?: string
  interactive?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<TAs>, 'as' | 'className' | 'children'>

export function Card<TAs extends ElementType = 'section'>({
  as,
  className,
  contentClassName,
  interactive = true,
  children,
  ...restProps
}: CardProps<TAs>) {
  const Component = as ?? 'section'

  return (
    <Component className={cn(styles.card, interactive && styles.interactive, className)} {...restProps}>
      <div className={cn(styles.content, contentClassName)}>{children}</div>
    </Component>
  )
}
