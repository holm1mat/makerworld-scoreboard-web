export type MetricKey = 'likes' | 'collects' | 'downloads' | 'prints' | 'boosts' | 'followers'

export interface MetricSummary {
  total: number
  today: number
  lastHour: number
  last7Days: number
}

export interface ScoreboardResponse {
  stats: Record<MetricKey, MetricSummary>
  capturedAt: string
  updatedAt: string
  handle: string
}

export interface EventItem {
  id: number
  created_at: string
  event_type: string
  stat: MetricKey
  old_value: number
  new_value: number
  delta: number
  message: string
}

export interface AchievementItem {
  id: number
  created_at: string
  achievement_type: string
  stat: MetricKey
  threshold: number
  current_value: number
  delta: number
  priority: string
  message: string
  seen: number
}
