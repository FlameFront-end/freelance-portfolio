import { useEffect, useState } from 'react'
import { useTheme } from '../../../app/providers/theme-context'
import { useDemoState } from '../../../shared/lib/use-demo-state'
import { useOneTimeSkeleton } from '../../../shared/lib/use-one-time-skeleton'
import { StateMessage } from '../../../shared/ui/state-message'
import { PreferencesSettings } from '../components/preferences-settings'
import { ProfileSettings } from '../components/profile-settings'
import { SettingsSkeleton } from '../components/settings-skeleton'
import { ThemeSettings } from '../components/theme-settings'
import {
  type PreferencesSettingsValue,
  type ProfileSettingsValue,
  readPreferencesSettings,
  readProfileSettings,
  savePreferencesSettings,
  saveProfileSettings,
} from '../lib/settings-storage'
import styles from './settings-page.module.scss'

export function SettingsPage() {
  const demoState = useDemoState()
  const isInitialLoading = useOneTimeSkeleton('settings', 720)
  const { mode, resolvedTheme, setMode } = useTheme()
  const [profile, setProfile] = useState<ProfileSettingsValue>(() =>
    readProfileSettings(),
  )
  const [preferences, setPreferences] = useState<PreferencesSettingsValue>(() =>
    readPreferencesSettings(),
  )

  useEffect(() => {
    saveProfileSettings(profile)
  }, [profile])

  useEffect(() => {
    savePreferencesSettings(preferences)
  }, [preferences])

  const handleProfileChange = <TField extends keyof ProfileSettingsValue>(
    field: TField,
    fieldValue: ProfileSettingsValue[TField],
  ) => {
    setProfile((previous) => ({ ...previous, [field]: fieldValue }))
  }

  const handlePreferencesChange = <
    TField extends keyof PreferencesSettingsValue,
  >(
    field: TField,
    fieldValue: PreferencesSettingsValue[TField],
  ) => {
    setPreferences((previous) => ({ ...previous, [field]: fieldValue }))
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <p className={styles.meta}>All changes are stored locally in your browser.</p>
      </header>

      {demoState === 'loading' || (demoState === 'ready' && isInitialLoading) ? (
        <SettingsSkeleton />
      ) : demoState === 'error' ? (
        <StateMessage
          variant="error"
          title="Settings unavailable"
          description="Mock error state: failed to load user preferences."
        />
      ) : demoState === 'empty' ? (
        <StateMessage
          variant="empty"
          title="No settings data"
          description="Mock empty state: profile and preferences are empty."
        />
      ) : (
        <div className={styles.layout}>
          <ProfileSettings value={profile} onChange={handleProfileChange} />
          <PreferencesSettings value={preferences} onChange={handlePreferencesChange} />
          <ThemeSettings mode={mode} resolvedTheme={resolvedTheme} onModeChange={setMode} />
        </div>
      )}
    </section>
  )
}
