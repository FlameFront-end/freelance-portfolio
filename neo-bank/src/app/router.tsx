import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/app-shell'
import { CardsPage } from '../features/cards/pages/cards-page'
import { DashboardPage } from '../features/dashboard/pages/dashboard-page'
import { ReportsPage } from '../features/reports/pages/reports-page'
import { SettingsPage } from '../features/settings/pages/settings-page'
import { TransactionsPage } from '../features/transactions/pages/transactions-page'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
