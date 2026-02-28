import { DataPrivacySection } from '../components/DataPrivacySection'
import { PreferencesSection } from '../components/PreferencesSection'
import { ProfileSection } from '../components/ProfileSection'
import { SecuritySection } from '../components/SecuritySection'
import { ThemeSection } from '../components/ThemeSection'
import { useOneTimeSkeleton } from '../../../shared/lib/useOneTimeSkeleton'
import { Card } from '../../../shared/ui/card/Card'
import { PageShell } from '../../../shared/ui/page-shell/PageShell'
import { SkeletonBlock } from '../../../shared/ui/states/SkeletonBlock'
import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  const isLoading = useOneTimeSkeleton('settings')

  return (
    <PageShell
      title="Settings"
      description="Expanded workspace settings with profile, security, theme, preferences, and data/privacy controls."
    >
      {isLoading ? (
        <div className={styles.layout}>
          <div className={styles.leftColumn}>
            <Card className={styles.skeletonCard}>
              <div className={styles.skeletonHead}>
                <SkeletonBlock width="28%" height={19} />
                <SkeletonBlock width="62%" height={14} />
              </div>

              <div className={styles.skeletonProfileLayout}>
                <div className={styles.skeletonAvatar}>
                  <SkeletonBlock width={54} height={54} borderRadius={999} />
                  <SkeletonBlock width={70} height={11} />
                  <SkeletonBlock width={62} height={30} borderRadius={10} />
                </div>

                <div>
                  <div className={styles.skeletonGridTwo}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className={styles.skeletonField}>
                        <SkeletonBlock width="34%" height={14} />
                        <SkeletonBlock width="100%" height={38} borderRadius={10} />
                      </div>
                    ))}
                  </div>

                  <div className={styles.skeletonActions}>
                    <SkeletonBlock width={106} height={30} borderRadius={10} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className={styles.skeletonCard}>
              <div className={styles.skeletonHead}>
                <SkeletonBlock width="24%" height={19} />
                <SkeletonBlock width="56%" height={14} />
              </div>

              <div className={styles.skeletonGridTwo}>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className={styles.skeletonField}>
                    <SkeletonBlock width="46%" height={14} />
                    <SkeletonBlock width="100%" height={38} borderRadius={10} />
                  </div>
                ))}
              </div>

              <div className={styles.skeletonStack}>
                <div className={styles.skeletonSurfaceRow}>
                  <SkeletonBlock width="52%" height={13} />
                  <SkeletonBlock width={78} height={30} borderRadius={10} />
                </div>

                <div className={styles.skeletonSurfaceRow}>
                  <SkeletonBlock width="44%" height={13} />
                  <SkeletonBlock width={78} height={30} borderRadius={10} />
                </div>

                <SkeletonBlock width="30%" height={12} />

                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={styles.skeletonSessionRow}>
                    <div className={styles.skeletonSessionMain}>
                      <SkeletonBlock width={128} height={13} />
                      <SkeletonBlock width={94} height={12} />
                    </div>
                    <SkeletonBlock width={74} height={30} borderRadius={10} />
                  </div>
                ))}
              </div>

              <div className={styles.skeletonActions}>
                <SkeletonBlock width={156} height={30} borderRadius={10} />
              </div>
            </Card>
          </div>

          <div className={styles.rightColumn}>
            <Card className={styles.skeletonCard}>
              <div className={styles.skeletonHead}>
                <SkeletonBlock width="30%" height={19} />
                <SkeletonBlock width="58%" height={14} />
              </div>

              <div className={styles.skeletonSurfaceRow}>
                <SkeletonBlock width="34%" height={12} />
                <SkeletonBlock width={56} height={13} />
              </div>

              <div className={styles.skeletonButtonsGrid}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlock key={index} width="100%" height={36} borderRadius={10} />
                ))}
              </div>
            </Card>

            <Card className={styles.skeletonCard}>
              <div className={styles.skeletonHead}>
                <SkeletonBlock width="34%" height={19} />
                <SkeletonBlock width="58%" height={14} />
              </div>

              <div className={styles.skeletonGridTwo}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className={styles.skeletonField}>
                    <SkeletonBlock width="42%" height={14} />
                    <SkeletonBlock width="100%" height={38} borderRadius={10} />
                  </div>
                ))}
              </div>

              <div className={styles.skeletonStack}>
                <div className={styles.skeletonSurfaceRow}>
                  <SkeletonBlock width="44%" height={13} />
                  <SkeletonBlock width={78} height={30} borderRadius={10} />
                </div>

                <div className={styles.skeletonSurfaceRow}>
                  <SkeletonBlock width="42%" height={13} />
                  <SkeletonBlock width={78} height={30} borderRadius={10} />
                </div>
              </div>

              <div className={styles.skeletonActions}>
                <SkeletonBlock width={128} height={30} borderRadius={10} />
              </div>
            </Card>

            <Card className={styles.skeletonCard}>
              <div className={styles.skeletonHead}>
                <SkeletonBlock width="40%" height={19} />
                <SkeletonBlock width="62%" height={14} />
              </div>

              <div className={styles.skeletonStack}>
                <SkeletonBlock width="30%" height={12} />

                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className={styles.skeletonSurfaceRow}>
                    <div className={styles.skeletonSessionMain}>
                      <SkeletonBlock width={148} height={13} />
                      <SkeletonBlock width={190} height={12} />
                    </div>
                    <SkeletonBlock width={64} height={30} borderRadius={10} />
                  </div>
                ))}
              </div>

              <div className={styles.skeletonPhrase}>
                <SkeletonBlock width="48%" height={12} />
                <SkeletonBlock width="96%" height={13} />
                <SkeletonBlock width="76%" height={13} />
              </div>

              <div className={styles.skeletonDanger}>
                <div className={styles.skeletonSessionMain}>
                  <SkeletonBlock width={92} height={13} />
                  <SkeletonBlock width={194} height={12} />
                </div>
                <SkeletonBlock width={84} height={30} borderRadius={10} />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.leftColumn}>
            <ProfileSection />
            <SecuritySection />
          </div>

          <div className={styles.rightColumn}>
            <ThemeSection />
            <PreferencesSection />
            <DataPrivacySection />
          </div>
        </div>
      )}
    </PageShell>
  )
}
