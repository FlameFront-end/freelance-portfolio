import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeftRight,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { accounts, transactions } from '../../data'
import {
  getMonthOptions,
  getMonthlyTotals,
  getTotalBalance,
} from '../../entities/finance/model/selectors'
import { SelectField } from '../../shared/ui/select-field'
import { ThemeToggle } from '../../shared/ui/theme-toggle/theme-toggle'
import styles from './app-shell.module.scss'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/cards', label: 'Cards', icon: CreditCard },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function AppShell() {
  const location = useLocation()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const totalBalance = useMemo(() => getTotalBalance(accounts), [])
  const monthOptions = useMemo(() => getMonthOptions(transactions), [])
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[0]?.value ?? '',
  )
  const monthlyTotals = useMemo(
    () =>
      selectedMonth
        ? getMonthlyTotals(transactions, selectedMonth)
        : { income: 0, expenses: 0, net: 0 },
    [selectedMonth],
  )
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }),
    [],
  )
  const formatCurrency = (amount: number) => currencyFormatter.format(amount)

  return (
    <div
      className={`${styles.shell} ${isSidebarCollapsed ? styles.shellCollapsed : ''}`}
    >
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>NeoBank</p>
          <p className={styles.caption}>Personal Finance Manager</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <Icon size={18} />
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <div className={styles.balanceBlock}>
            <button
              type="button"
              className={styles.sidebarToggle}
              onClick={() => setIsSidebarCollapsed((previous) => !previous)}
              aria-label={
                isSidebarCollapsed ? 'Expand sidebar menu' : 'Collapse sidebar menu'
              }
            >
              {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>

            <div>
              <p className={styles.balanceLabel}>Total balance</p>
              <p className={`numbers ${styles.balanceValue}`}>
                {formatCurrency(totalBalance)}
              </p>
              <p className={styles.balanceMeta}>
                Income {formatCurrency(monthlyTotals.income)} | Expenses{' '}
                {formatCurrency(monthlyTotals.expenses)} | Net{' '}
                <span
                  className={
                    monthlyTotals.net >= 0 ? styles.positiveNet : styles.negativeNet
                  }
                >
                  {formatCurrency(monthlyTotals.net)}
                </span>
              </p>
            </div>
          </div>

          <div className={styles.controls}>
            <SelectField
              options={
                monthOptions.length === 0
                  ? [{ value: '', label: 'No data', disabled: true }]
                  : monthOptions
              }
              disabled={monthOptions.length === 0}
              value={selectedMonth}
              onChange={setSelectedMonth}
              wrapperClassName={styles.monthSelector}
              className={styles.monthSelectorTrigger}
            />

            <ThemeToggle />
            <div className={styles.avatar} aria-label="User profile">
              AL
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              className={styles.pageTransition}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <nav className={styles.bottomNav}>
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.bottomNavItem} ${isActive ? styles.bottomNavItemActive : ''}`
              }
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
