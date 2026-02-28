import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import styles from './DataTable.module.scss'

export type DataTableColumn<TRow> = {
  id: string
  header: ReactNode
  renderCell: (row: TRow) => ReactNode
  align?: 'left' | 'right'
  width?: string
}

type DataTableProps<TRow> = {
  columns: DataTableColumn<TRow>[]
  rows: TRow[]
  rowKey: (row: TRow) => string
  className?: string
  onRowClick?: (row: TRow) => void
  rowAriaLabel?: (row: TRow) => string
}

export function DataTable<TRow>({
  columns,
  rows,
  rowKey,
  className,
  onRowClick,
  rowAriaLabel,
}: DataTableProps<TRow>) {
  const isInteractive = typeof onRowClick === 'function'

  return (
    <div className={cn(styles.wrap, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn(styles.headCell, column.align === 'right' && styles.headCellRight)}
                style={column.width ? { width: column.width } : undefined}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={cn(styles.row, isInteractive && styles.rowInteractive)}
              onClick={isInteractive ? () => onRowClick(row) : undefined}
              onKeyDown={
                isInteractive
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onRowClick(row)
                      }
                    }
                  : undefined
              }
              tabIndex={isInteractive ? 0 : undefined}
              role={isInteractive ? 'button' : undefined}
              aria-label={isInteractive && rowAriaLabel ? rowAriaLabel(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={cn(styles.cell, column.align === 'right' && styles.cellRight)}
                >
                  {column.renderCell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
