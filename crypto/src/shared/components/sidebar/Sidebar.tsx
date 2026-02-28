import {
  ChartPie,
  LayoutDashboard,
  LineChart,
  Settings,
  SquareActivity,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', mobileLabel: 'Home', icon: LayoutDashboard },
  { to: '/portfolio', label: 'Portfolio', mobileLabel: 'Assets', icon: ChartPie },
  { to: '/transactions', label: 'Transactions', mobileLabel: 'Txns', icon: SquareActivity },
  { to: '/analytics', label: 'Analytics', mobileLabel: 'Stats', icon: LineChart },
  { to: '/settings', label: 'Settings', mobileLabel: 'Prefs', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>ChainPilot</div>

      <nav className={styles.menu} aria-label="Main navigation">
        {navItems.map(({ to, label, mobileLabel, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          >
            <Icon size={17} />
            <span className={styles.fullLabel}>{label}</span>
            <span className={styles.mobileLabel}>{mobileLabel}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
