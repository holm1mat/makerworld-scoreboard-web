import type { AchievementItem } from '@/types'
import { getJson, sendJson } from '@/api/client'

export async function fetchPendingAchievements(): Promise<AchievementItem[]> {
  return getJson<AchievementItem[]>('/achievements/pending')
}

export async function markAchievementSeen(id: number): Promise<AchievementItem> {
  return sendJson<AchievementItem>(`/achievements/${id}/seen`, { seen: 1 })
}

export async function fetchAchievements(): Promise<AchievementItem[]> {
  return getJson<AchievementItem[]>('/achievements')
}