import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type SectionRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function SectionReveal({
  children,
  delay = 0,
  className,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.52, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
