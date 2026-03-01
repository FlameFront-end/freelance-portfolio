import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './HighlightsSection.module.scss'

const highlights = [
  {
    title: 'Private pool',
    description: 'Quiet water courtyard framed by stone and palms.',
    image:
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&fm=webp&q=72&w=1280',
  },
  {
    title: 'Tropical garden',
    description: 'Layered greenery with shaded lounge pockets.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&fm=webp&q=72&w=1280',
  },
  {
    title: 'Sunset terrace',
    description: 'Open-air deck for golden hour dinners and calm views.',
    image:
      'https://images.unsplash.com/photo-1592229505726-ca121723b8ef?auto=format&fit=crop&fm=webp&q=72&w=1280',
  },
]

export function HighlightsSection() {
  return (
    <section className={styles.section}>
      <SectionReveal>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Highlights</p>
            <h2>Three signature spaces at AURA VILLA</h2>
          </div>

          <div className={styles.grid}>
            {highlights.map((highlight) => (
              <article className={styles.card} key={highlight.title}>
                <div
                  className={styles.media}
                  style={{ backgroundImage: `url(${highlight.image})` }}
                />
                <div className={styles.overlay} aria-hidden />
                <div className={styles.content}>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
