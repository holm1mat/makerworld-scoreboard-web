import type { AchievementItem, EventItem, ScoreboardResponse } from '@/types'

export const mockScoreboard: ScoreboardResponse = {
  handle: '@makermatt3D',
  capturedAt: '2026-07-03T20:40:43.732632',
  updatedAt: '2026-07-03T20:45:02.123Z',
  stats: {
    likes: { total: 32812, today: 151, lastHour: 8, last7Days: 1050 },
    collects: { total: 100756, today: 592, lastHour: 20, last7Days: 3900 },
    downloads: { total: 88670, today: 457, lastHour: 14, last7Days: 2700 },
    prints: { total: 58480, today: 295, lastHour: 9, last7Days: 1800 },
    boosts: { total: 2124, today: 1, lastHour: 0, last7Days: 4 },
    followers: { total: 1917, today: 1, lastHour: 0, last7Days: 12 },
  },
}

export const mockEvents: EventItem[] = [
  {
    id: 1,
    created_at: '2026-07-03T20:43:10.000Z',
    event_type: 'LIKES_GAIN',
    stat: 'likes',
    old_value: 32810,
    new_value: 32812,
    delta: 2,
    message: '❤️ +2 Likes',
  },
  {
    id: 2,
    created_at: '2026-07-03T20:42:30.000Z',
    event_type: 'PRINTS_GAIN',
    stat: 'prints',
    old_value: 58479,
    new_value: 58480,
    delta: 1,
    message: '🖨️ +1 Print',
  },
  {
    id: 3,
    created_at: '2026-07-03T20:41:12.000Z',
    event_type: 'DOWNLOADS_GAIN',
    stat: 'downloads',
    old_value: 88666,
    new_value: 88670,
    delta: 4,
    message: '⬇️ +4 Downloads',
  },
]

export const mockAchievement: AchievementItem = {
  id: 4,
  created_at: '2026-07-03T20:44:10.000Z',
  achievement_type: 'BOOST_RECEIVED',
  stat: 'boosts',
  threshold: 1,
  current_value: 2124,
  delta: 1,
  priority: 'takeover',
  message: '🚀 Boost received!',
  seen: 0,
}
