import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { applyTheme, isThemeMode, THEME_STORAGE_KEY, type ThemeMode } from '../../lib/theme/theme'

type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveInitialTheme(): ThemeMode {
  const domTheme = document.documentElement.dataset.theme ?? null
  if (isThemeMode(domTheme)) {
    return domTheme
  }

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeMode(storedTheme)) {
      return storedTheme
    }
  } catch {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(resolveInitialTheme)

  useEffect(() => {
    applyTheme(theme)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // No-op when browser storage is blocked.
    }
  }, [theme])

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
