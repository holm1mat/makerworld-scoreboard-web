import { useEffect, useMemo, useState } from 'react'
import type { AchievementItem } from '@/types'
import { fetchAchievements, markAchievementSeen } from '@/api/achievementsApi'

export function useAchievementQueue(pollInterval = 5000) {
  const [pending, setPending] = useState<AchievementItem[]>()
  const [activeAchievement, setActiveAchievement] = useState<AchievementItem | undefined>()
  const [error, setError] = useState<string | null>(null)

  const nextAchievement = useMemo(
    () => pending?.find((achievement) => achievement.seen === 0),
    [pending],
  )

  useEffect(() => {
    let active = true

    async function refresh() {
      try {
        const result = await fetchAchievements()
        if (!active) return
        setPending(result)
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
    if (!activeAchievement && nextAchievement) {
      setActiveAchievement(nextAchievement)
    }
  }, [nextAchievement, activeAchievement])

  useEffect(() => {
    if (!activeAchievement) return

    let isMounted = true
    const timer = window.setTimeout(async () => {
      try {
        await markAchievementSeen(activeAchievement.id)
        if (!isMounted) return
        setActiveAchievement(undefined)
        setPending((current) => current?.filter((item) => item.id !== activeAchievement.id))
      } catch {
        // keep the achievement visible until the next retry
      }
    }, 4500)

    return () => {
      isMounted = false
      window.clearTimeout(timer)
    }
  }, [activeAchievement])

  return { activeAchievement, error }
}
