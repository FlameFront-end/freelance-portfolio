import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  type ResolvedTheme,
  ThemeContext,
  type ThemeMode,
} from './theme-context'

const THEME_STORAGE_KEY = 'neo-bank-theme-mode'

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system'

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isThemeMode(storedValue) ? storedValue : 'system'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredTheme())
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'light' : getSystemTheme(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)

    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [])

  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    document.documentElement.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  const value = useMemo(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
