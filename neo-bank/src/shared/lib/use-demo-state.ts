import { useSearchParams } from 'react-router-dom'

export type DemoUiState = 'ready' | 'loading' | 'empty' | 'error'

export const useDemoState = (): DemoUiState => {
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state')

  if (state === 'loading' || state === 'empty' || state === 'error') {
    return state
  }

  return 'ready'
}
