import type { ScoreboardResponse } from '@/types'
import { getJson } from '@/api/client'

export async function fetchScoreboard(): Promise<ScoreboardResponse> {
  return getJson<ScoreboardResponse>('/scoreboard')
}
