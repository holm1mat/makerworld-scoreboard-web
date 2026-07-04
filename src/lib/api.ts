import type { AchievementItem, EventItem, ScoreboardResponse } from '@/types'

const API_BASE_URL = 'http://127.0.0.1:8787'

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function fetchScoreboard(): Promise<ScoreboardResponse> {
  return getJson<ScoreboardResponse>('/scoreboard')
}

export async function fetchEvents(): Promise<EventItem[]> {
  return getJson<EventItem[]>('/events')
}

export async function fetchAchievements(): Promise<AchievementItem[]> {
  return getJson<AchievementItem[]>('/achievements')
}
