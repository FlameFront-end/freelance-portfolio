import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './TextInput.module.scss'

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  icon?: ReactNode
  wrapperClassName?: string
}

export function TextInput({ label, icon, className, wrapperClassName, ...props }: TextInputProps) {
  return (
    <label className={cn(styles.field, wrapperClassName)}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.control}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <input className={cn(styles.input, className)} {...props} />
      </span>
    </label>
  )
}
