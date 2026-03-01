import type { FormEvent } from 'react'
import type { BookingErrors, BookingValues } from '../../model/bookingMath'
import { DatePickerField } from '../date-picker-field/DatePickerField'
import styles from './BookingForm.module.scss'

type BookingFormProps = {
  formId: string
  values: BookingValues
  errors: BookingErrors
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onFieldChange: <K extends keyof BookingValues>(field: K, value: BookingValues[K]) => void
}

export function BookingForm({
  formId,
  values,
  errors,
  onSubmit,
  onFieldChange,
}: BookingFormProps) {
  return (
    <form id={formId} className={styles.form} onSubmit={onSubmit} noValidate>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Book</p>
        <h1>Check availability</h1>
        <p>Send a booking request for your preferred dates.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <span>Check-in date</span>
          <DatePickerField
            value={values.checkIn}
            onChange={(isoDate) => onFieldChange('checkIn', isoDate)}
          />
          {errors.checkIn ? <small>{errors.checkIn}</small> : null}
        </div>

        <div className={styles.field}>
          <span>Check-out date</span>
          <DatePickerField
            value={values.checkOut}
            minDate={values.checkIn || undefined}
            onChange={(isoDate) => onFieldChange('checkOut', isoDate)}
          />
          {errors.checkOut ? <small>{errors.checkOut}</small> : null}
        </div>
      </div>

      <label className={styles.field}>
        <span>Guests</span>
        <div className={styles.stepper} role="group" aria-label="Guests stepper">
          <button
            type="button"
            onClick={() => onFieldChange('guests', Math.max(1, values.guests - 1))}
            disabled={values.guests <= 1}
            aria-label="Decrease guests"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            max={6}
            value={values.guests}
            onChange={(event) =>
              onFieldChange(
                'guests',
                Number.isNaN(Number(event.target.value)) ? 1 : Number(event.target.value),
              )
            }
          />
          <button
            type="button"
            onClick={() => onFieldChange('guests', Math.min(6, values.guests + 1))}
            disabled={values.guests >= 6}
            aria-label="Increase guests"
          >
            +
          </button>
        </div>
        {errors.guests ? <small>{errors.guests}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Name</span>
        <input
          type="text"
          value={values.name}
          onChange={(event) => onFieldChange('name', event.target.value)}
          placeholder="Your full name"
          required
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => onFieldChange('email', event.target.value)}
          placeholder="you@example.com"
          required
        />
        {errors.email ? <small>{errors.email}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Notes (optional)</span>
        <textarea
          value={values.notes}
          onChange={(event) => onFieldChange('notes', event.target.value)}
          placeholder="Any special requests"
          rows={4}
        />
      </label>
    </form>
  )
}
