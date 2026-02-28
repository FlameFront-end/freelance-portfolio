import { AnimatePresence, motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from './AppLayout.module.scss'
import { Sidebar } from '../sidebar/Sidebar'
import { Topbar } from '../topbar/Topbar'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Topbar />
        <main className={styles.content}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              className={styles.pageTransition}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
