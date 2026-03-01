import { AlertTriangle, Inbox } from 'lucide-react'
import styles from './state-message.module.scss'

type StateMessageProps = {
  variant: 'empty' | 'error'
  title: string
  description: string
}

export function StateMessage({ variant, title, description }: StateMessageProps) {
  const Icon = variant === 'error' ? AlertTriangle : Inbox

  return (
    <section
      className={`${styles.panel} ${variant === 'error' ? styles.error : styles.empty}`}
    >
      <Icon size={20} />
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  )
}
