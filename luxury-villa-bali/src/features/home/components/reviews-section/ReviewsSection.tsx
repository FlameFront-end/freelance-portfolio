import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './ReviewsSection.module.scss'

const reviews = [
  {
    name: 'Sophie Martin',
    country: 'France',
    rating: 5,
    text: 'A serene and beautifully designed villa. Every corner feels intentional, calm, and private.',
  },
  {
    name: 'Daniel Foster',
    country: 'Australia',
    rating: 5,
    text: 'Perfect for a slow week in Bali. The pool and sunset terrace were our daily highlights.',
  },
  {
    name: 'Mina Park',
    country: 'South Korea',
    rating: 5,
    text: 'Elegant interiors, excellent housekeeping, and a very peaceful neighborhood close to great cafes.',
  },
]

export function ReviewsSection() {
  return (
    <section className={styles.section} id="reviews">
      <SectionReveal>
        <div className="container">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Reviews</p>
            <h2>Guest impressions</h2>
          </div>

          <div className={styles.grid}>
            {reviews.map((review) => (
              <article key={review.name} className={styles.card}>
                <div className={styles.top}>
                  <div>
                    <h3>{review.name}</h3>
                    <p className={styles.country}>{review.country}</p>
                  </div>
                  <span className={styles.stars} aria-label={`${review.rating} stars`}>
                    {Array.from({ length: review.rating }, () =>
                      String.fromCharCode(9733),
                    ).join('')}
                  </span>
                </div>
                <p className={styles.text}>{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
