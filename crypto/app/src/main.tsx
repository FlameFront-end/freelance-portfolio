import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/global.scss'
import App from './App.tsx'
import { ThemeProvider } from './shared/providers/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
