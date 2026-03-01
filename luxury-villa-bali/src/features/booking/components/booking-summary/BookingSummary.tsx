import { formatUsd } from '../../model/bookingMath'
import styles from './BookingSummary.module.scss'

type BookingSummaryProps = {
  formId: string
  nights: number
  pricePerNight: number
  cleaningFee: number
  isSubmitted: boolean
}

export function BookingSummary({
  formId,
  nights,
  pricePerNight,
  cleaningFee,
  isSubmitted,
}: BookingSummaryProps) {
  const staySubtotal = nights * pricePerNight
  const total = nights > 0 ? staySubtotal + cleaningFee : 0

  return (
    <aside className={styles.card}>
      <p className={styles.eyebrow}>Booking summary</p>

      <div className={styles.row}>
        <span>Price per night</span>
        <strong>{formatUsd(pricePerNight)}</strong>
      </div>

      <div className={styles.row}>
        <span>Nights</span>
        <strong>{nights}</strong>
      </div>

      <div className={styles.row}>
        <span>Stay subtotal</span>
        <strong>{formatUsd(staySubtotal)}</strong>
      </div>

      <div className={styles.row}>
        <span>Cleaning fee</span>
        <strong>{formatUsd(cleaningFee)}</strong>
      </div>

      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <strong>{formatUsd(total)}</strong>
      </div>

      <button
        type="submit"
        form={formId}
        className={styles.cta}
        disabled={isSubmitted}
        aria-disabled={isSubmitted}
      >
        {isSubmitted ? 'Request sent' : 'Request booking'}
      </button>
    </aside>
  )
}
