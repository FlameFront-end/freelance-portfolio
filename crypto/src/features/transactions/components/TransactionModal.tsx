import { motion } from 'framer-motion'
import { Check, Copy, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatCurrency } from '../../../shared/lib/format'
import type { AssetChain, Transaction, TransactionStatus } from '../../../shared/model/portfolio/types'
import { Button } from '../../../shared/ui/button/Button'
import { StatusBadge } from '../../../shared/ui/status-badge/StatusBadge'
import styles from './TransactionModal.module.scss'

type TransactionModalProps = {
  transaction: Transaction
  onClose: () => void
}

type FeeDetails = {
  nativeSymbol: string
  nativeAmount: string
  usdAmount: string
}

const chainNativeSymbol: Record<AssetChain, string> = {
  Ethereum: 'ETH',
  Arbitrum: 'ETH',
  Base: 'ETH',
  Polygon: 'MATIC',
  Solana: 'SOL',
}

const nativeUsdPrice: Record<AssetChain, number> = {
  Ethereum: 3200,
  Arbitrum: 3200,
  Base: 3200,
  Polygon: 0.95,
  Solana: 142,
}

const statusTone: Record<TransactionStatus, 'success' | 'warning' | 'danger'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'danger',
}

function buildMockFee(transaction: Transaction): FeeDetails {
  const symbol = chainNativeSymbol[transaction.chain]
  const referencePrice = nativeUsdPrice[transaction.chain]
  const feeUsd = Math.max(transaction.valueUsd * 0.00065, 0.1)
  const feeNative = feeUsd / referencePrice

  return {
    nativeSymbol: symbol,
    nativeAmount: feeNative.toFixed(symbol === 'MATIC' ? 4 : 5),
    usdAmount: formatCurrency(feeUsd),
  }
}

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallback below
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  const success = document.execCommand('copy')
  document.body.removeChild(textarea)
  return success
}

export function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  const [copiedKey, setCopiedKey] = useState<'hash' | 'address' | null>(null)
  const hashValue = useMemo(() => transaction.hashShort, [transaction.hashShort])
  const addressValue = useMemo(() => transaction.addressShort, [transaction.addressShort])
  const fee = useMemo(() => buildMockFee(transaction), [transaction])

  const handleCopy = async (key: 'hash' | 'address', text: string) => {
    const copied = await copyText(text)
    if (!copied) {
      return
    }

    setCopiedKey(key)
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1200)
  }

  return (
    <>
      <motion.button
        type="button"
        className={styles.overlay}
        aria-label="Close transaction modal"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className={styles.modalWrap}>
        <motion.section
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Transaction details"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className={styles.header}>
            <div className={styles.titleWrap}>
              <h2 className={styles.title}>Transaction Details</h2>
              <p className={styles.sub}>
                {transaction.type} • {transaction.assetSymbol} • {transaction.chain}
              </p>
            </div>

            <button type="button" className={styles.closeButton} aria-label="Close modal" onClick={onClose}>
              <X size={16} />
            </button>
          </header>

          <div className={styles.content}>
            <div className={styles.grid}>
              <div className={styles.item}>
                <span className={styles.label}>Status</span>
                <div className={styles.row}>
                  <StatusBadge tone={statusTone[transaction.status]}>{transaction.status}</StatusBadge>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Timestamp</span>
                <span className={styles.value}>{new Date(transaction.timestamp).toLocaleString('en-US')}</span>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Hash</span>
                <div className={styles.rowTop}>
                  <span className={styles.code} title={hashValue}>
                    {hashValue}
                  </span>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() => handleCopy('hash', hashValue)}
                  >
                    {copiedKey === 'hash' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedKey === 'hash' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Address</span>
                <div className={styles.rowTop}>
                  <span className={styles.code} title={addressValue}>
                    {addressValue}
                  </span>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() => handleCopy('address', addressValue)}
                  >
                    {copiedKey === 'address' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedKey === 'address' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Amount</span>
                <span className={styles.value}>
                  {transaction.amount} {transaction.assetSymbol} ({formatCurrency(transaction.valueUsd)})
                </span>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Fee (mock)</span>
                <span className={styles.value}>
                  {fee.nativeAmount} {fee.nativeSymbol} ({fee.usdAmount})
                </span>
              </div>
            </div>

            <div className={styles.footer}>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}
