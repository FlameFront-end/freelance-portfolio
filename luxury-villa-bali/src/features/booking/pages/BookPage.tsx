import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookingForm } from '../components/booking-form/BookingForm'
import { BookingSuccess } from '../components/booking-success/BookingSuccess'
import { BookingSummary } from '../components/booking-summary/BookingSummary'
import {
  calculateNights,
  validateBooking,
  type BookingErrors,
  type BookingValues,
} from '../model/bookingMath'
import styles from './BookPage.module.scss'

function getInitialBookingValues(storageKey: string): BookingValues {
  const defaults: BookingValues = {
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    notes: '',
  }

  if (typeof window === 'undefined') {
    return defaults
  }

  const raw = window.localStorage.getItem(storageKey)

  if (!raw) {
    return defaults
  }

  try {
    const parsed = JSON.parse(raw) as Partial<BookingValues>

    return {
      ...defaults,
      checkIn: typeof parsed.checkIn === 'string' ? parsed.checkIn : defaults.checkIn,
      checkOut: typeof parsed.checkOut === 'string' ? parsed.checkOut : defaults.checkOut,
      guests:
        typeof parsed.guests === 'number'
          ? Math.min(6, Math.max(1, parsed.guests))
          : defaults.guests,
    }
  } catch {
    window.localStorage.removeItem(storageKey)
    return defaults
  }
}

export function BookPage() {
  const formId = 'booking-request-form'
  const storageKey = 'aura-villa-booking-preferences-v1'
  const pricePerNight = 420
  const cleaningFee = 75

  const [values, setValues] = useState<BookingValues>(() =>
    getInitialBookingValues(storageKey),
  )
  const [errors, setErrors] = useState<BookingErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const payload = {
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: values.guests,
    }
    window.localStorage.setItem(storageKey, JSON.stringify(payload))
  }, [values.checkIn, values.checkOut, values.guests])

  const nights = useMemo(
    () => calculateNights(values.checkIn, values.checkOut),
    [values.checkIn, values.checkOut],
  )

  const onFieldChange = <K extends keyof BookingValues>(field: K, value: BookingValues[K]) => {
    setValues((prev) => ({
      ...prev,
      [field]:
        field === 'guests'
          ? (Math.min(6, Math.max(1, Number(value))) as BookingValues[K])
          : value,
    }))
    setIsSubmitted(false)
    setErrors((prev) => (Object.keys(prev).length > 0 ? {} : prev))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateBooking(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setIsSubmitted(false)
      return
    }

    setErrors({})
    setIsSubmitted(true)
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Booking</p>
          <h2>Reserve your preferred dates</h2>
          <p>Front-end booking flow with validation and instant pricing summary.</p>
        </header>

        <div className={styles.layout}>
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitted ? (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <BookingSuccess values={values} onEdit={() => setIsSubmitted(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <BookingForm
                  formId={formId}
                  values={values}
                  errors={errors}
                  onSubmit={onSubmit}
                  onFieldChange={onFieldChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <BookingSummary
            formId={formId}
            nights={nights}
            pricePerNight={pricePerNight}
            cleaningFee={cleaningFee}
            isSubmitted={isSubmitted}
          />
        </div>
      </div>
    </section>
  )
}
