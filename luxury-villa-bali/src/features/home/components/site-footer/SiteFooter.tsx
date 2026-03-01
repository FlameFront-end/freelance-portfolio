import { Link } from 'react-router-dom'
import styles from './SiteFooter.module.scss'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span>AURA VILLA</span>
          <p>Pererenan, Bali</p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <Link to="/#villa">Villa</Link>
          <Link to="/#gallery">Gallery</Link>
          <Link to="/book">Book</Link>
        </nav>

        <p className={styles.copy}>© 2026 AURA VILLA</p>
      </div>
    </footer>
  )
}
