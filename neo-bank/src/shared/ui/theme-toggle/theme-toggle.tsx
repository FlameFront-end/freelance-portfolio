import { Laptop, Moon, Sun } from 'lucide-react'
import { type ThemeMode, useTheme } from '../../../app/providers/theme-context'
import styles from './theme-toggle.module.scss'

const options: Array<{ label: string; value: ThemeMode; icon: typeof Sun }> = [
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'system', icon: Laptop },
]

export function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <div className={styles.toggle} role="tablist" aria-label="Theme switcher">
      {options.map((option) => {
        const Icon = option.icon
        const isActive = option.value === mode

        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={() => setMode(option.value)}
            aria-pressed={isActive}
          >
            <Icon size={14} />
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
