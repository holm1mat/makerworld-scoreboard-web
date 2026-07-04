import { useEffect, useState } from 'react'
import type { AchievementItem } from '@/types'
import { fetchPendingAchievements, markAchievementSeen } from '@/api/achievementsApi'

const ACHIEVEMENT_DISPLAY_MS = 5000
const ACHIEVEMENT_TRANSITION_MS = 300
const ACHIEVEMENT_POLL_MS = 60000

export function useAchievementQueue(pollInterval = ACHIEVEMENT_POLL_MS) {
  const [queue, setQueue] = useState<AchievementItem[]>([])
  const [activeAchievement, setActiveAchievement] = useState<AchievementItem | undefined>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function refresh() {
      try {
        const result = await fetchPendingAchievements()
        if (!active) return
        setQueue(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch achievements')
      }
    }

    refresh()
    const interval = window.setInterval(refresh, pollInterval)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [pollInterval])

  useEffect(() => {
    if (activeAchievement || queue.length === 0) return
    setActiveAchievement(queue[0])
  }, [activeAchievement, queue])

  useEffect(() => {
    if (!activeAchievement) return

    let isMounted = true
    let transitionTimer: number | undefined
    const timer = window.setTimeout(async () => {
      try {
        await markAchievementSeen(activeAchievement.id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to mark achievement as seen')
      }

      if (!isMounted) return

      setQueue((current) => current.filter((item) => item.id !== activeAchievement.id))
      transitionTimer = window.setTimeout(() => {
        if (isMounted) {
          setActiveAchievement(undefined)
        }
      }, ACHIEVEMENT_TRANSITION_MS)
    }, ACHIEVEMENT_DISPLAY_MS)

    return () => {
      isMounted = false
      window.clearTimeout(timer)
      if (transitionTimer) {
        window.clearTimeout(transitionTimer)
      }
    }
  }, [activeAchievement])

  return { activeAchievement, error }
}
