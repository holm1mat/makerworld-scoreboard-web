import type { EventItem, ScoreboardResponse } from '@/types'
import ActivityFeed from '@/components/ActivityFeed'
import StatsGrid from '@/components/StatsGrid'

type ConnectionState = 'connecting' | 'live' | 'disconnected'

interface DashboardProps {
  scoreboard?: ScoreboardResponse
  events?: EventItem[]
  loading: boolean
  connectionState: ConnectionState
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function Dashboard({ scoreboard, events, loading, connectionState }: DashboardProps) {
  if (!scoreboard) {
    return (
      <section className="dashboard-shell">
        <div className="dashboard-empty">
          {loading ? 'Loading the dashboard…' : 'No scoreboard data available.'}
        </div>
      </section>
    )
  }

  const statusLabel = connectionState === 'disconnected' ? 'DISCONNECTED' : 'LIVE'
  const statusClass = connectionState === 'disconnected' ? 'dashboard-pill--disconnected' : 'dashboard-pill--live'

  return (
    <section className="dashboard-shell">
      <div className="dashboard-panel dashboard-panel--top">
        <div>
          <p className="dashboard-title">MAKERWORLD DASHBOARD</p>
          <p className="dashboard-handle">{scoreboard.handle}</p>
        </div>
        <div className="dashboard-status-row">
          <span className={`dashboard-pill ${statusClass}`}>
            <span className="dashboard-pill__dot" /> {statusLabel}
          </span>
          <p className="dashboard-meta">Updated {formatTimestamp(scoreboard.updatedAt)}</p>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="stats-panel">
          <div className="stats-panel__header">
            <p className="panel-eyebrow dashboard-title">Aggregated stats overview</p>
          </div>
          <StatsGrid stats={scoreboard.stats} />
        </div>
        <ActivityFeed events={events} />
      </div>
    </section>
  )
}
