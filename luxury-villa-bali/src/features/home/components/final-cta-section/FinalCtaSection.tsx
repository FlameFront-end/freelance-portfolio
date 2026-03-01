import { Link } from 'react-router-dom'
import { SectionReveal } from '../../../../shared/ui/section-reveal/SectionReveal'
import styles from './FinalCtaSection.module.scss'

export function FinalCtaSection() {
  return (
    <section className={styles.section}>
      <SectionReveal>
        <div className="container">
          <article className={styles.banner}>
            <p className={styles.eyebrow}>Final CTA</p>
            <h2>Ready for your Bali stay?</h2>
            <p>Check dates and send a booking request in under a minute.</p>
            <Link className={styles.cta} to="/book">
              Book now
            </Link>
          </article>
        </div>
      </SectionReveal>
    </section>
  )
}
