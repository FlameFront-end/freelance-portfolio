export type ProfileSettingsValue = {
  fullName: string
  email: string
  phone: string
}

export type PreferencesSettingsValue = {
  currency: 'USD' | 'EUR' | 'GBP'
  numberFormat: '1,234.56' | '1 234,56'
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY'
}

const PROFILE_KEY = 'neo-bank-settings-profile'
const PREFERENCES_KEY = 'neo-bank-settings-preferences'

const isBrowser = (): boolean => typeof window !== 'undefined'

const safeRead = <T,>(key: string, fallbackValue: T): T => {
  if (!isBrowser()) {
    return fallbackValue
  }

  const stored = window.localStorage.getItem(key)
  if (!stored) {
    return fallbackValue
  }

  try {
    return { ...fallbackValue, ...JSON.parse(stored) } as T
  } catch {
    return fallbackValue
  }
}

const safeWrite = <T,>(key: string, value: T): void => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export const defaultProfileSettings: ProfileSettingsValue = {
  fullName: 'Alex Lee',
  email: 'alex.lee@neobank.demo',
  phone: '+1 (555) 204-9381',
}

export const defaultPreferencesSettings: PreferencesSettingsValue = {
  currency: 'USD',
  numberFormat: '1,234.56',
  dateFormat: 'MM/DD/YYYY',
}

export const readProfileSettings = (): ProfileSettingsValue =>
  safeRead(PROFILE_KEY, defaultProfileSettings)

export const readPreferencesSettings = (): PreferencesSettingsValue =>
  safeRead(PREFERENCES_KEY, defaultPreferencesSettings)

export const saveProfileSettings = (value: ProfileSettingsValue): void =>
  safeWrite(PROFILE_KEY, value)

export const savePreferencesSettings = (
  value: PreferencesSettingsValue,
): void => safeWrite(PREFERENCES_KEY, value)
