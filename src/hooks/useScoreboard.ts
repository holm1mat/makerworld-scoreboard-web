import { useEffect, useState } from 'react'
import type { ScoreboardResponse } from '@/types'
import { fetchScoreboard } from '@/api/scoreboardApi'

export function useScoreboard(pollInterval = 15000) {
  const [scoreboard, setScoreboard] = useState<ScoreboardResponse | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function refresh() {
      try {
        setLoading(true)
        const result = await fetchScoreboard()

        if (!active) return
        console.log('[API] /scoreboard', result)
        setScoreboard(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch scoreboard')
      } finally {
        if (active) setLoading(false)
      }
    }

    refresh()
    const interval = window.setInterval(refresh, pollInterval)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [pollInterval])

  return { scoreboard, loading, error }
}
