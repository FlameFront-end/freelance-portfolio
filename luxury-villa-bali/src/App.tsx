import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BookPage } from './features/booking/pages/BookPage'
import { HomePage } from './features/home/pages/HomePage'
import { VillaPage } from './features/villa/pages/VillaPage'
import { SiteLayout } from './shared/components/site-layout/SiteLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/villa" element={<VillaPage />} />
          <Route path="/book" element={<BookPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
