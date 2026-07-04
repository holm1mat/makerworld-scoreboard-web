import type { EventItem, ScoreboardResponse } from '@/types'
import ActivityFeed from '@/components/ActivityFeed'
import StatsGrid from '@/components/StatsGrid'

interface DashboardProps {
  scoreboard?: ScoreboardResponse
  events?: EventItem[]
  loading: boolean
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function Dashboard({ scoreboard, events, loading }: DashboardProps) {
  if (!scoreboard) {
    return (
      <section className="dashboard-shell">
        <div className="dashboard-empty">
          {loading ? 'Loading the dashboard…' : 'No scoreboard data available.'}
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-shell">
      <div className="dashboard-panel dashboard-panel--top">
        <div>
          <p className="dashboard-handle">{scoreboard.handle}</p>
          <p className="dashboard-meta">
            Captured {formatTimestamp(scoreboard.capturedAt)} · Updated {formatTimestamp(scoreboard.updatedAt)}
          </p>
        </div>
      </div>

      <StatsGrid stats={scoreboard.stats} />
      <ActivityFeed events={events} />
    </section>
  )
}
