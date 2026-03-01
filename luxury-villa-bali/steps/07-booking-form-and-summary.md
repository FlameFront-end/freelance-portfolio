# Step 07 - Booking Form and Summary

## Goal
Implement front-end only booking flow with validation and price summary.

## Tasks
- Create booking UI on `/book` (or modal, if chosen).
- Form fields:
  - check-in date
  - check-out date
  - guests (stepper 1-6)
  - name
  - email
  - notes (optional)
- Validation rules:
  - required: all except notes
  - check-out > check-in
  - guests range 1..6
  - valid email format
- Submit behavior:
  - no backend call
  - show success state: `Booking request sent`
- Optional persistence:
  - store dates and guests in `localStorage`
- Add booking summary card:
  - price per night (mock)
  - nights count (calculated)
  - cleaning fee (mock)
  - total (calculated)
  - CTA `Request booking`

## Done When
- Form blocks invalid input and shows valid success state.
- Summary total updates based on selected dates.

