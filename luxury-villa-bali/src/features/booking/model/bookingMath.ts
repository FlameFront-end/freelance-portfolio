export type BookingValues = {
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  notes: string
}

export type BookingErrors = Partial<
  Record<'checkIn' | 'checkOut' | 'guests' | 'name' | 'email', string>
>

const ONE_DAY_MS = 24 * 60 * 60 * 1000

function parseDateToUtcMidnight(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return Date.UTC(year, month - 1, day)
}

export function calculateNights(checkIn: string, checkOut: string) {
  const start = parseDateToUtcMidnight(checkIn)
  const end = parseDateToUtcMidnight(checkOut)

  if (start === null || end === null) {
    return 0
  }

  const diff = Math.floor((end - start) / ONE_DAY_MS)
  return diff > 0 ? diff : 0
}

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {}

  if (!values.checkIn) {
    errors.checkIn = 'Select check-in date.'
  }

  if (!values.checkOut) {
    errors.checkOut = 'Select check-out date.'
  }

  if (!values.name.trim()) {
    errors.name = 'Enter your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email.'
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(values.email)) {
      errors.email = 'Use a valid email address.'
    }
  }

  if (values.guests < 1 || values.guests > 6) {
    errors.guests = 'Guests must be between 1 and 6.'
  }

  if (values.checkIn && values.checkOut) {
    const nights = calculateNights(values.checkIn, values.checkOut)
    if (nights <= 0) {
      errors.checkOut = 'Check-out must be after check-in.'
    }
  }

  return errors
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
