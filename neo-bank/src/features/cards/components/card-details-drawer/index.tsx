import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Card, Transaction } from '../../../../entities/finance/model/types'
import { formatCurrency, formatShortDate, formatSignedAmount } from '../../lib/formatters'
import styles from './card-details-drawer.module.scss'

type CardDetailsDrawerProps = {
  isOpen: boolean
  card: Card | null
  operations: Transaction[]
  limitDraft: string
  isEditingLimit: boolean
  onLimitDraftChange: (value: string) => void
  onStartEditLimit: () => void
  onSaveLimit: () => void
  onCancelEditLimit: () => void
  onToggleStatus: () => void
  onClose: () => void
}

export function CardDetailsDrawer({
  isOpen,
  card,
  operations,
  limitDraft,
  isEditingLimit,
  onLimitDraftChange,
  onStartEditLimit,
  onSaveLimit,
  onCancelEditLimit,
  onToggleStatus,
  onClose,
}: CardDetailsDrawerProps) {
  if (!card) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.aside
            className={styles.drawer}
            role="dialog"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.header}>
              <div>
                <h3 className={styles.title}>{card.type} Card</h3>
                <p className={styles.meta}>**** **** **** {card.last4}</p>
              </div>
              <button type="button" className={styles.close} onClick={onClose}>
                <X size={17} />
              </button>
            </header>

            <section className={styles.section}>
              <p className={styles.label}>Status</p>
              <div className={styles.row}>
                <span
                  className={`${styles.status} ${
                    card.status === 'Active'
                      ? styles.statusActive
                      : styles.statusFrozen
                  }`}
                >
                  {card.status}
                </span>
                <button type="button" className={styles.button} onClick={onToggleStatus}>
                  {card.status === 'Active' ? 'Freeze' : 'Unfreeze'}
                </button>
              </div>
            </section>

            <section className={styles.section}>
              <p className={styles.label}>Spending limit</p>
              {isEditingLimit ? (
                <div className={styles.limitEditor}>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={limitDraft}
                    onChange={(event) => onLimitDraftChange(event.target.value)}
                  />
                  <div className={styles.inlineActions}>
                    <button type="button" className={styles.button} onClick={onSaveLimit}>
                      Save
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={onCancelEditLimit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.row}>
                  <p className={`numbers ${styles.limitValue}`}>
                    {formatCurrency(card.spendingLimit)}
                  </p>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={onStartEditLimit}
                  >
                    Change limit
                  </button>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <p className={styles.label}>Recent card operations</p>
              <div className={styles.operations}>
                {operations.length === 0 ? (
                  <p className={styles.empty}>No recent operations.</p>
                ) : (
                  operations.map((operation) => (
                    <article key={operation.id} className={styles.operation}>
                      <div>
                        <p className={styles.merchant}>{operation.merchant}</p>
                        <p className={styles.meta}>
                          {operation.category} | {formatShortDate(operation.date)}
                        </p>
                      </div>
                      <p
                        className={`numbers ${styles.amount} ${
                          operation.type === 'Income'
                            ? styles.income
                            : styles.expense
                        }`}
                      >
                        {formatSignedAmount(operation.amount, operation.type)}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </section>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
