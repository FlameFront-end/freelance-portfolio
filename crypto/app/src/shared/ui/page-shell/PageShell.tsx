import styles from './PageShell.module.scss'

import { motion } from 'framer-motion'
import { Children, type ReactNode } from 'react'

type PageShellProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PageShell({ title, description, children }: PageShellProps) {
  const contentItems = Children.toArray(children)

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>
      {contentItems.length > 0 ? (
        <div className={styles.content}>
          {contentItems.map((child, index) => (
            <motion.div
              key={index}
              className={styles.contentItem}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
