import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import styles from './SiteLayout.module.scss'

const sectionLinks = [
  { to: '/#top', label: 'Home' },
  { to: '/#villa', label: 'Villa' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/#amenities', label: 'Amenities' },
  { to: '/#location', label: 'Location' },
  { to: '/#reviews', label: 'Reviews' },
  { to: '/book', label: 'Book' },
]

export function SiteLayout() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isHome = location.pathname === '/'
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const sectionId = location.hash.replace('#', '')
    const target = document.getElementById(sectionId)

    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash, location.pathname])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isMenuOpen])

  const isLinkActive = (to: string) => {
    if (to === '/book') {
      return location.pathname === '/book'
    }

    if (location.pathname !== '/') {
      return false
    }

    if (!location.hash && to === '/#top') {
      return true
    }

    return Boolean(location.hash) && to.endsWith(location.hash)
  }

  return (
    <div className={styles.shell}>
      <header
        className={cn(
          styles.header,
          isMenuOpen && styles.headerMenuOpen,
          isHome && !isScrolled ? styles.headerOverlay : styles.headerSolid,
        )}
      >
        <div className={cn('container', styles.headerInner)}>
          <Link to="/#top" className={styles.logo}>
            AURA VILLA
          </Link>

          <button
            type="button"
            className={cn(styles.menuButton, isMenuOpen && styles.menuButtonOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="site-main-nav"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="site-main-nav"
            className={cn(styles.nav, isMenuOpen && styles.navOpen)}
            aria-label="Main"
          >
            {sectionLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(styles.navLink, isLinkActive(link.to) && styles.navLinkActive)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link className={styles.mobileCta} to="/book" onClick={() => setIsMenuOpen(false)}>
              Check availability
            </Link>
          </nav>

          <Link className={styles.cta} to="/book">
            Check availability
          </Link>
        </div>
      </header>

      {isMenuOpen ? (
        <button
          type="button"
          className={styles.menuBackdrop}
          aria-label="Close navigation"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}

      <main className={cn(styles.main, isHome ? styles.mainHome : styles.mainInner)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className={styles.pageTransition}
            initial={
              prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
