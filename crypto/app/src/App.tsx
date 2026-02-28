import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AnalyticsPage } from './features/analytics/pages/AnalyticsPage'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'
import { PortfolioPage } from './features/portfolio/pages/PortfolioPage'
import { SettingsPage } from './features/settings/pages/SettingsPage'
import { TransactionsPage } from './features/transactions/pages/TransactionsPage'
import { AppLayout } from './shared/components/app-layout/AppLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
