import DashboardPreview from '@/components/DashboardPreview'
import { mockAchievement, mockEvents, mockScoreboard } from '@/lib/mockData'

export default function AppPreview() {
  return (
    <div className="app-shell">
      <DashboardPreview
        scoreboard={mockScoreboard}
        events={mockEvents}
        achievement={mockAchievement}
      />
    </div>
  )
}
