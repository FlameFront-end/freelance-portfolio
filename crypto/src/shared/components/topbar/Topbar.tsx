import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Topbar.module.scss'
import { useTheme } from '../../providers/theme/ThemeProvider'
import { SelectField } from '../../ui/select-field/SelectField'

export function Topbar() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const isLightTheme = theme === 'light'
  const [network, setNetwork] = useState('ethereum-mainnet')

  return (
    <header className={styles.topbar}>
      <div className={styles.balance}>
        <span>Total balance</span>
        <strong>$128,460.92</strong>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectWrap}>
          <span>Network</span>
          <SelectField
            value={network}
            onChange={setNetwork}
            options={[
              { value: 'ethereum-mainnet', label: 'Ethereum Mainnet' },
              { value: 'arbitrum', label: 'Arbitrum' },
              { value: 'polygon', label: 'Polygon' },
              { value: 'base', label: 'Base' },
            ]}
            wrapperClassName={styles.networkField}
            className={styles.networkTrigger}
          />
        </div>

        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label="Theme toggle"
        >
          {isLightTheme ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isLightTheme ? 'Light' : 'Dark'}</span>
        </button>

        <button
          type="button"
          className={styles.avatar}
          aria-label="Open settings profile"
          onClick={() => navigate('/settings')}
        >
          JD
        </button>
      </div>
    </header>
  )
}
