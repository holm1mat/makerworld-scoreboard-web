import { useEffect, useState } from 'react'
import type { AchievementItem, MetricKey } from '@/types'
import { fetchAchievements } from '@/api/achievementsApi'

export function useDailyAchievements() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function fetchTodaysAchievements() {
      try {
        setLoading(true)
        const result = await fetchAchievements()
        if (!active) return

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const todaysAchievements = result.filter((achievement: AchievementItem) => {
          const achievementDate = new Date(achievement.created_at)
          achievementDate.setHours(0, 0, 0, 0)
          return achievementDate.getTime() === today.getTime()
        })

        setAchievements(todaysAchievements)
        setError(null)
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to fetch achievements')
          setAchievements([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchTodaysAchievements()
  }, [])

  const hasAchievementForStat = (stat: MetricKey): boolean => {
    return achievements.some((achievement) => achievement.stat === stat)
  }

  return { achievements, loading, error, hasAchievementForStat }
}
