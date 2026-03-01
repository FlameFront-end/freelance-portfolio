import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './HeroSection.module.scss'

export function HeroSection() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden />
      <div className={styles.overlay} aria-hidden />

      <div className={`container ${styles.content}`}>
        <motion.p
          className={styles.meta}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0, ease: 'easeOut' }}
        >
          Pererenan, Bali
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08, ease: 'easeOut' }}
        >
          A private sanctuary for slow luxury.
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.16, ease: 'easeOut' }}
        >
          AURA VILLA is a contemporary two-level retreat with a private pool,
          tropical garden, and sunset terrace.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.24, ease: 'easeOut' }}
        >
          <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/book">
            Check availability
          </Link>
          <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/#villa">
            Explore villa
          </Link>
        </motion.div>

        <motion.ul
          className={styles.facts}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.32, ease: 'easeOut' }}
        >
          <li>3 bedrooms</li>
          <li>6 guests</li>
          <li>Private pool</li>
          <li>Pererenan</li>
        </motion.ul>
      </div>
    </section>
  )
}
