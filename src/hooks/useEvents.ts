import { useEffect, useState } from 'react'
import type { EventItem } from '@/types'
import { fetchEvents } from '@/api/eventsApi'

export function useEvents(pollInterval = 15000) {
  const [events, setEvents] = useState<EventItem[] | undefined>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function refresh() {
      try {
        const result = await fetchEvents()
        if (!active) return
        console.log('[API] /events', result)
        setEvents(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events')
      }
    }

    refresh()
    const interval = window.setInterval(refresh, pollInterval)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [pollInterval])

  return { events, error }
}
