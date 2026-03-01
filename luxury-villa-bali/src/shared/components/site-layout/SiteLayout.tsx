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
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null)
  const isHome = location.pathname === '/'
  const locationKey = `${location.pathname}${location.hash}`
  const isMenuOpen = menuOpenedAt === locationKey
  const prefersReducedMotion = useReducedMotion()

  const closeMenu = () => {
    setMenuOpenedAt(null)
  }

  const toggleMenu = () => {
    setMenuOpenedAt((prev) => (prev === locationKey ? null : locationKey))
  }

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
    if (!isMenuOpen) {
      return
    }

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    document.documentElement.style.setProperty(
      '--mobile-nav-height',
      `${Math.round(viewportHeight)}px`,
    )

    return () => {
      document.documentElement.style.removeProperty('--mobile-nav-height')
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const scrollY = window.scrollY
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevLeft = document.body.style.left
    const prevRight = document.body.style.right
    const prevWidth = document.body.style.width

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.left = prevLeft
      document.body.style.right = prevRight
      document.body.style.width = prevWidth
      window.scrollTo(0, scrollY)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpenedAt(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
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
            onClick={toggleMenu}
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
            <div className={styles.mobileNavIntro} aria-hidden="true">
              <span className={styles.mobileNavOverline}>Private Stay</span>
              <strong className={styles.mobileNavTitle}>AURA Villa Bali</strong>
            </div>

            {sectionLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(styles.navLink, isLinkActive(link.to) && styles.navLinkActive)}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <Link className={styles.mobileCta} to="/book" onClick={closeMenu}>
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
          onClick={closeMenu}
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
