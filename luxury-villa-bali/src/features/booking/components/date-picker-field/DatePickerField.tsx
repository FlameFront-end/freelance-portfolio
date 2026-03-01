import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './DatePickerField.module.scss'

type DatePickerFieldProps = {
  value: string
  minDate?: string
  placeholder?: string
  onChange: (isoDate: string) => void
}

type CalendarDay = {
  iso: string
  day: number
  inCurrentMonth: boolean
}

const weekdayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function parseIso(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day)
}

function toIso(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

function formatDisplay(isoDate: string) {
  const parsed = parseIso(isoDate)
  if (!parsed) {
    return 'ДД.ММ.ГГГГ'
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsed)
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function getCalendarDays(monthDate: Date): CalendarDay[] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInCurrent = new Date(year, month + 1, 0).getDate()
  const daysInPrevious = new Date(year, month, 0).getDate()

  return Array.from({ length: 42 }, (_, index) => {
    if (index < firstWeekday) {
      const day = daysInPrevious - firstWeekday + index + 1
      const date = new Date(year, month - 1, day)
      return { iso: toIso(date), day, inCurrentMonth: false }
    }

    if (index < firstWeekday + daysInCurrent) {
      const day = index - firstWeekday + 1
      const date = new Date(year, month, day)
      return { iso: toIso(date), day, inCurrentMonth: true }
    }

    const day = index - (firstWeekday + daysInCurrent) + 1
    const date = new Date(year, month + 1, day)
    return { iso: toIso(date), day, inCurrentMonth: false }
  })
}

export function DatePickerField({
  value,
  minDate,
  placeholder = 'ДД.ММ.ГГГГ',
  onChange,
}: DatePickerFieldProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState<Date | null>(null)

  const selectedMonth = useMemo(() => {
    const parsedValue = value ? parseIso(value) : null
    return parsedValue ? startOfMonth(parsedValue) : null
  }, [value])

  const minMonth = useMemo(() => {
    const parsedMin = minDate ? parseIso(minDate) : null
    return startOfMonth(parsedMin ?? new Date())
  }, [minDate])

  const displayMonth = viewMonth ?? selectedMonth ?? minMonth

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current) {
        return
      }

      if (rootRef.current.contains(event.target as Node)) {
        return
      }

      setIsOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const days = useMemo(() => getCalendarDays(displayMonth), [displayMonth])
  const todayIso = useMemo(() => toIso(new Date()), [])

  const monthLabel = getMonthLabel(displayMonth)
  const displayValue = value ? formatDisplay(value) : placeholder

  const isDateDisabled = (isoDate: string) => Boolean(minDate && isoDate < minDate)

  const onSelectDay = (isoDate: string) => {
    if (isDateDisabled(isoDate)) {
      return
    }

    onChange(isoDate)
    setViewMonth(null)
    setIsOpen(false)
  }

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => {
          setViewMonth(null)
          setIsOpen((prev) => !prev)
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.value : styles.placeholder}>{displayValue}</span>
        <span className={styles.icon} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 3v3M17 3v3M4 10h16M6 6h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <div className={styles.popover} role="dialog" aria-label="Date picker">
          <header className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() =>
                setViewMonth((prev) => addMonths(prev ?? displayMonth, -1))
              }
              aria-label="Previous month"
            >
              ‹
            </button>
            <p className={styles.monthLabel}>{monthLabel}</p>
            <button
              type="button"
              className={styles.navButton}
              onClick={() =>
                setViewMonth((prev) => addMonths(prev ?? displayMonth, 1))
              }
              aria-label="Next month"
            >
              ›
            </button>
          </header>

          <div className={styles.weekdays}>
            {weekdayLabels.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.grid}>
            {days.map((dayInfo) => {
              const isDisabled = isDateDisabled(dayInfo.iso)
              const isSelected = value === dayInfo.iso
              const isToday = dayInfo.iso === todayIso

              return (
                <button
                  key={dayInfo.iso}
                  type="button"
                  className={[
                    styles.day,
                    !dayInfo.inCurrentMonth ? styles.outside : '',
                    isSelected ? styles.selected : '',
                    isToday ? styles.today : '',
                  ].join(' ')}
                  onClick={() => onSelectDay(dayInfo.iso)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                >
                  {dayInfo.day}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
