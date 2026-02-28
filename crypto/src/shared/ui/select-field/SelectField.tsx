import { Check, ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { cn } from '../../lib/cn'
import styles from './SelectField.module.scss'

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectFieldProps = {
  label?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  name?: string
  disabled?: boolean
  id?: string
  className?: string
  wrapperClassName?: string
}

export function SelectField({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select option',
  name,
  disabled = false,
  id,
  className,
  wrapperClassName,
}: SelectFieldProps) {
  const generatedId = useId()
  const controlId = id ?? `select-field-${generatedId}`
  const labelId = `${controlId}-label`
  const listboxId = `${controlId}-listbox`
  const rootRef = useRef<HTMLDivElement | null>(null)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(() => {
    if (defaultValue !== undefined) {
      return defaultValue
    }

    return options.find((option) => !option.disabled)?.value ?? ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const selectedValue = isControlled ? value : internalValue
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? null,
    [options, selectedValue],
  )

  useEffect(() => {
    if (isControlled) {
      return
    }

    const currentExists = options.some(
      (option) => option.value === internalValue && !option.disabled,
    )
    if (currentExists) {
      return
    }

    const fallback = options.find((option) => !option.disabled)?.value ?? ''
    setInternalValue(fallback)
  }, [internalValue, isControlled, options])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const selectedIndex = options.findIndex((option) => option.value === selectedValue && !option.disabled)
    if (selectedIndex >= 0) {
      setHighlightedIndex(selectedIndex)
      return
    }

    const firstEnabledIndex = options.findIndex((option) => !option.disabled)
    setHighlightedIndex(firstEnabledIndex)
  }, [isOpen, options, selectedValue])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent | PointerEvent) => {
      if (!rootRef.current) {
        return
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const enabledIndexes = useMemo(
    () =>
      options.reduce<number[]>((acc, option, index) => {
        if (!option.disabled) {
          acc.push(index)
        }

        return acc
      }, []),
    [options],
  )

  const commitValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }

    onChange?.(nextValue)
    setIsOpen(false)
  }

  const moveHighlight = (direction: 1 | -1) => {
    if (enabledIndexes.length === 0) {
      return
    }

    if (highlightedIndex < 0) {
      setHighlightedIndex(enabledIndexes[0])
      return
    }

    const currentEnabledPosition = enabledIndexes.indexOf(highlightedIndex)
    const nextEnabledPosition =
      (currentEnabledPosition + direction + enabledIndexes.length) % enabledIndexes.length
    setHighlightedIndex(enabledIndexes[nextEnabledPosition])
  }

  const selectHighlighted = () => {
    if (highlightedIndex < 0) {
      return
    }

    const option = options[highlightedIndex]
    if (!option || option.disabled) {
      return
    }

    commitValue(option.value)
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        moveHighlight(1)
      }
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        moveHighlight(-1)
      }
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        selectHighlighted()
      }
      return
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleListboxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveHighlight(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveHighlight(-1)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      selectHighlighted()
      return
    }

    if (event.key === 'Escape' || event.key === 'Tab') {
      setIsOpen(false)
    }
  }

  const handleOptionPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
    option: SelectOption,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    if (!option.disabled) {
      commitValue(option.value)
    }
  }

  const handleOptionClick = (event: ReactMouseEvent<HTMLButtonElement>, option: SelectOption) => {
    // Pointer selection is handled on pointerdown; click with detail=0 is keyboard activation.
    if (event.detail !== 0) {
      return
    }

    event.preventDefault()

    if (!option.disabled) {
      commitValue(option.value)
    }
  }

  return (
    <div className={cn(styles.field, wrapperClassName)}>
      {label ? (
        <span id={labelId} className={styles.label}>
          {label}
        </span>
      ) : null}

      <div className={styles.control} ref={rootRef}>
        <button
          id={controlId}
          type="button"
          className={cn(styles.trigger, isOpen && styles.triggerOpen, className)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={label ? `${labelId} ${controlId}` : undefined}
          disabled={disabled}
          onClick={() => setIsOpen((current) => !current)}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={cn(styles.value, !selectedOption && styles.placeholder)}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown size={16} className={cn(styles.chevron, isOpen && styles.chevronOpen)} />
        </button>

        {isOpen ? (
          <div
            id={listboxId}
            className={styles.menu}
            role="listbox"
            aria-labelledby={label ? labelId : controlId}
            onKeyDown={handleListboxKeyDown}
          >
            {options.map((option, index) => {
              const selected = option.value === selectedValue
              const highlighted = index === highlightedIndex

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    styles.option,
                    selected && styles.optionSelected,
                    highlighted && styles.optionHighlighted,
                    option.disabled && styles.optionDisabled,
                  )}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onPointerDown={(event) => handleOptionPointerDown(event, option)}
                  onClick={(event) => handleOptionClick(event, option)}
                  disabled={option.disabled}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {selected ? <Check size={14} className={styles.optionCheck} /> : null}
                </button>
              )
            })}
          </div>
        ) : null}

        {name ? <input type="hidden" name={name} value={selectedValue ?? ''} /> : null}
      </div>
    </div>
  )
}
