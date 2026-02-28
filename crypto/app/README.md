# Web3 Portfolio Manager

## Concept UI
Portfolio concept built as a premium Web3/Crypto dashboard interface for showcase use.

## Frontend-only
This project is frontend-only and runs fully on local mock data.

## No real blockchain integration
No wallets, no on-chain transactions, and no real blockchain providers are used.

## NDA-safe
All data is synthetic mock data with no client-sensitive or production secrets.

## Tech stack
- React + TypeScript + Vite
- SCSS Modules
- Recharts
- Framer Motion
- lucide-react

## Features list
- Multi-page app with sidebar routing:
  - `/dashboard`
  - `/portfolio`
  - `/transactions`
  - `/settings`
- Global dark/light theme with localStorage persistence and no initial flicker
- Dashboard:
  - summary cards
  - performance chart with 1D/7D/1M/1Y switch
  - allocation donut with legend
  - recent transactions
  - watchlist with mini charts
- Portfolio:
  - search + chain/risk filters + sorting
  - sticky-head assets table
  - asset drawer with mini chart, mock actions, last 3 transactions
- Transactions:
  - type/status/chain/date filters
  - sticky-head transaction table
  - transaction details modal with mock fee and copy actions
- Settings:
  - profile section (UI-only)
  - preferences section (UI-only)
  - working theme controls connected to global theme provider
- Shared UI layer:
  - card, button, inputs, select, status badges, table
  - loading/empty/error states
- Responsive behavior for desktop and mobile breakpoints

## Live demo link
- Pending deployment
- Add URL here after publish: `https://<your-demo-host>`

## Screenshots
Required: 8 screenshots.

Suggested set:
1. Dashboard overview
2. Dashboard chart period switch
3. Portfolio with filters
4. Portfolio asset drawer
5. Transactions table with filters
6. Transaction details modal
7. Settings page
8. Theme comparison (dark/light)