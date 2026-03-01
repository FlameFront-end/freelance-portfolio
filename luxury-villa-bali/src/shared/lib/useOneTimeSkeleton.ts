import { useEffect, useState } from 'react'

type UseOneTimeSkeletonOptions = {
  minDelayMs?: number
  maxDelayMs?: number
}

export function useOneTimeSkeleton(
  options: UseOneTimeSkeletonOptions = {},
) {
  const { minDelayMs = 600, maxDelayMs = 900 } = options
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const min = Math.min(minDelayMs, maxDelayMs)
    const max = Math.max(minDelayMs, maxDelayMs)
    const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min

    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, randomDelay)

    return () => window.clearTimeout(timer)
  }, [maxDelayMs, minDelayMs])

  return isLoading
}
