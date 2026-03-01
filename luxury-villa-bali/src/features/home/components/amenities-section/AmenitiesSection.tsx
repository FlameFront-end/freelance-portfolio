import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './AmenitiesSection.module.scss'

const amenityGroups = [
  {
    title: 'Comfort',
    items: ['Air conditioning', 'King-size beds', 'Premium linens', 'Blackout curtains'],
  },
  {
    title: 'Kitchen',
    items: ['Full kitchen', 'Espresso machine', 'Filtered water', 'Dining set for 6'],
  },
  {
    title: 'Outdoors',
    items: ['Private pool', 'Sun loungers', 'Tropical garden', 'Sunset terrace'],
  },
  {
    title: 'Services',
    items: ['Daily housekeeping', 'Concierge support', 'Airport transfer help', 'In-villa check-in'],
  },
]

const features = [
  {
    title: 'Fast Wi-Fi',
    description: 'Reliable connection for work calls, streaming, and remote stays.',
  },
  {
    title: 'Daily housekeeping',
    description: 'Thoughtful daily refresh to keep the villa calm and spotless.',
  },
]

export function AmenitiesSection() {
  return (
    <section className={styles.section} id="amenities">
      <SectionReveal>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Amenities</p>
            <h2>Everything you need for a slow, comfortable stay</h2>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <span className={styles.featureDot} aria-hidden />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.groupGrid}>
            {amenityGroups.map((group) => (
              <article key={group.title} className={styles.groupCard}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
