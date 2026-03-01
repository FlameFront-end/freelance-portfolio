import { useEffect, useState } from 'react'

const visitedSkeletonKeys = new Set<string>()

export function useOneTimeSkeleton(key: string, delayMs = 700) {
  const [isLoading, setIsLoading] = useState(() => !visitedSkeletonKeys.has(key))

  useEffect(() => {
    if (visitedSkeletonKeys.has(key)) {
      return
    }

    const timer = window.setTimeout(() => {
      visitedSkeletonKeys.add(key)
      setIsLoading(false)
    }, delayMs)

    return () => window.clearTimeout(timer)
  }, [delayMs, key])

  return isLoading
}
