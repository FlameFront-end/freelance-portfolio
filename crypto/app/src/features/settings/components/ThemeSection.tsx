import { cn } from '../../../shared/lib/cn'
import { useTheme } from '../../../shared/providers/theme/ThemeProvider'
import { Button } from '../../../shared/ui/button/Button'
import { Card } from '../../../shared/ui/card/Card'
import styles from './ThemeSection.module.scss'

export function ThemeSection() {
  const { theme, setTheme, toggleTheme } = useTheme()

  return (
    <Card className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.title}>Theme</h2>
        <p className={styles.description}>This section is connected to the global app theme provider.</p>
      </header>

      <div className={styles.row}>
        <span className={styles.current}>Current theme</span>
        <span className={styles.value}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </div>

      <div className={styles.buttons}>
        <Button
          className={cn(theme === 'dark' && styles.active)}
          variant="ghost"
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>
        <Button
          className={cn(theme === 'light' && styles.active)}
          variant="ghost"
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button variant="primary" onClick={toggleTheme}>
          Toggle
        </Button>
      </div>
    </Card>
  )
}
