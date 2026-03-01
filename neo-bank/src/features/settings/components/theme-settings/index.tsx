import { Laptop, Moon, Sun } from 'lucide-react'
import type { ResolvedTheme, ThemeMode } from '../../../../app/providers/theme-context'
import styles from './theme-settings.module.scss'

type ThemeSettingsProps = {
  mode: ThemeMode
  resolvedTheme: ResolvedTheme
  onModeChange: (mode: ThemeMode) => void
}

const options: Array<{
  value: ThemeMode
  label: string
  icon: typeof Sun
}> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
]

export function ThemeSettings({
  mode,
  resolvedTheme,
  onModeChange,
}: ThemeSettingsProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.head}>
        <h3 className={styles.title}>Theme</h3>
        <p className={styles.meta}>Dark / Light / System mode</p>
      </header>

      <div className={styles.controls}>
        {options.map((option) => {
          const Icon = option.icon
          const isActive = option.value === mode

          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              onClick={() => onModeChange(option.value)}
              aria-pressed={isActive}
            >
              <Icon size={15} />
              {option.label}
            </button>
          )
        })}
      </div>

      <p className={styles.current}>
        Active mode: <strong>{mode}</strong> | Resolved theme:{' '}
        <strong>{resolvedTheme}</strong>
      </p>
    </section>
  )
}
