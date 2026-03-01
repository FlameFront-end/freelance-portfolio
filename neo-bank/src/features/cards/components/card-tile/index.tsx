import { Lock, LockOpen, Settings2 } from 'lucide-react'
import type { Card } from '../../../../entities/finance/model/types'
import { formatCurrency } from '../../lib/formatters'
import styles from './card-tile.module.scss'

type CardTileProps = {
  card: Card
  onToggleStatus: (cardId: string) => void
  onChangeLimit: (cardId: string) => void
  onViewDetails: (cardId: string) => void
}

export function CardTile({
  card,
  onToggleStatus,
  onChangeLimit,
  onViewDetails,
}: CardTileProps) {
  const isActive = card.status === 'Active'

  return (
    <article className={styles.card}>
      <div className={`${styles.visual} ${isActive ? styles.active : styles.frozen}`}>
        <div className={styles.visualTop}>
          <p className={styles.type}>{card.type} Card</p>
          <p className={styles.status}>{card.status}</p>
        </div>

        <p className={`numbers ${styles.number}`}>**** **** **** {card.last4}</p>

        <div className={styles.visualBottom}>
          <p className={styles.expiry}>Exp {card.expiry}</p>
          <p className={`numbers ${styles.limit}`}>
            Limit {formatCurrency(card.spendingLimit)}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onToggleStatus(card.id)}
        >
          {isActive ? <Lock size={15} /> : <LockOpen size={15} />}
          {isActive ? 'Freeze' : 'Unfreeze'}
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => onChangeLimit(card.id)}
        >
          <Settings2 size={15} />
          Change limit
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => onViewDetails(card.id)}
        >
          View details
        </button>
      </div>
    </article>
  )
}
