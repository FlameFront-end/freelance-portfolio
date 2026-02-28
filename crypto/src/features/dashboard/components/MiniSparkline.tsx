import styles from './MiniSparkline.module.scss'

type MiniSparklineProps = {
  values: number[]
  positive: boolean
}

const width = 96
const height = 34

export function MiniSparkline({ values, positive }: MiniSparklineProps) {
  if (values.length < 2) {
    return null
  }

  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = Math.max(maxValue - minValue, 1e-6)

  const coordinates = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - ((value - minValue) / range) * height

    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  return (
    <svg className={styles.chart} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline
        className={styles.line}
        points={coordinates.join(' ')}
        stroke={positive ? 'var(--success)' : 'var(--danger)'}
      />
    </svg>
  )
}
