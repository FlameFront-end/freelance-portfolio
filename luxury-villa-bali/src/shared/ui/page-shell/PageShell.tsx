import type { ReactNode } from 'react'
import styles from './PageShell.module.scss'

type PageShellProps = {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <section className="container">
      <article className={styles.card}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </article>
    </section>
  )
}
