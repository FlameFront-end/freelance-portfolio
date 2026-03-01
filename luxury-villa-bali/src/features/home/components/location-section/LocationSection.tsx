import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './LocationSection.module.scss'

const nearby = [
  { place: 'Beach', time: '8 min' },
  { place: 'Cafes', time: '3 min' },
  { place: 'Airport', time: '45 min' },
]

const mapSpots = [
  { label: 'Beach', className: 'spotBeach' },
  { label: 'Cafes', className: 'spotCafes' },
  { label: 'Airport', className: 'spotAirport' },
]

export function LocationSection() {
  return (
    <section className={styles.section} id="location">
      <SectionReveal>
        <div className="container">
          <div className={styles.layout}>
            <article className={styles.mapCard} aria-label="Map preview">
              <p className={styles.eyebrow}>Location</p>
              <h2>Pererenan, Bali</h2>
              <p>Quietly placed between rice fields and the western coast.</p>
              <div className={styles.mapCanvas} aria-hidden>
                <svg
                  className={styles.routesSvg}
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                >
                  <path className={styles.routePathShort} d="M50 25 L57 30" />
                  <path className={styles.routePathMedium} d="M80 20 L66 26 L57 30" />
                  <path className={styles.routePathLong} d="M14 50 L30 43 L45 36 L57 30" />
                  <circle className={styles.routeNode} cx="50" cy="25" r="1.05" />
                  <circle className={styles.routeNode} cx="80" cy="20" r="1.05" />
                  <circle className={styles.routeNode} cx="14" cy="50" r="1.05" />
                </svg>
                <span className={styles.ring} />
                <span className={styles.pin} />
                <span className={styles.pinLabel}>AURA VILLA</span>
                {mapSpots.map((spot) => (
                  <span
                    key={spot.label}
                    className={`${styles.spot} ${styles[spot.className as keyof typeof styles]}`}
                  >
                    {spot.label}
                  </span>
                ))}
              </div>
            </article>

            <article className={styles.infoCard}>
              <p className={styles.eyebrow}>Nearby</p>
              <ul>
                {nearby.map((item) => (
                  <li key={item.place}>
                    <span>{item.place}</span>
                    <strong>{item.time}</strong>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Pererenan%2C+Bali"
                target="_blank"
                rel="noreferrer"
                className={styles.mapsLink}
              >
                Open in Maps
              </a>
            </article>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
