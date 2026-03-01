import type { BookingValues } from '../../model/bookingMath'
import styles from './BookingSuccess.module.scss'

type BookingSuccessProps = {
  values: BookingValues
  onEdit: () => void
}

function formatDate(isoDate: string) {
  if (!isoDate) {
    return '-'
  }

  const [year, month, day] = isoDate.split('-').map(Number)

  if (!year || !month || !day) {
    return isoDate
  }

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function BookingSuccess({ values, onEdit }: BookingSuccessProps) {
  return (
    <section className={styles.card} aria-live="polite">
      <div className={styles.statusChip} aria-hidden>
        <span className={styles.icon}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5 9.2 16.6 19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={styles.statusLabel}>Request sent</span>
      </div>

      <h1>Booking request sent</h1>
      <p className={styles.lead}>
        We will contact you shortly to confirm availability and final details.
      </p>

      <div className={styles.details}>
        <div>
          <span>Guest</span>
          <strong>{values.name || '-'}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{values.email || '-'}</strong>
        </div>
        <div>
          <span>Check-in</span>
          <strong>{formatDate(values.checkIn)}</strong>
        </div>
        <div>
          <span>Check-out</span>
          <strong>{formatDate(values.checkOut)}</strong>
        </div>
        <div>
          <span>Guests</span>
          <strong>{values.guests}</strong>
        </div>
      </div>

      <button type="button" className={styles.secondaryBtn} onClick={onEdit}>
        Edit request
      </button>
    </section>
  )
}
