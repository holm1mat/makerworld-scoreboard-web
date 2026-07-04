import type { AchievementItem, EventItem, ScoreboardResponse } from '@/types'
import Dashboard from '@/components/Dashboard'
import AchievementOverlay from '@/components/AchievementOverlay'

interface DashboardPreviewProps {
  scoreboard: ScoreboardResponse
  events: EventItem[]
  achievement?: AchievementItem
}

export default function DashboardPreview({ scoreboard, events, achievement }: DashboardPreviewProps) {
  return (
    <div className="dashboard-preview">
      <Dashboard scoreboard={scoreboard} events={events} loading={false} connectionState="live" />
      {achievement ? <AchievementOverlay achievement={achievement} /> : null}
    </div>
  )
}
