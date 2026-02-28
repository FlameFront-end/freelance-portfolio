export const THEME_STORAGE_KEY = 'chainpilot-theme'

export type ThemeMode = 'dark' | 'light'

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light'
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}
