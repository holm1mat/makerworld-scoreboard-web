import type { EventItem } from '@/types'

interface ActivityFeedProps {
  events?: EventItem[]
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  if (!events?.length) {
    return (
      <section className="activity-panel">
        <div className="activity-panel__header">
          <h2>Recent activity</h2>
          <p>Live changes will appear here.</p>
        </div>
        <div className="empty-state">Waiting for recent activity…</div>
      </section>
    )
  }

  return (
    <section className="activity-panel">
      <div className="activity-panel__header">
        <div>
          <h2>Recent activity</h2>
          <p>Latest metric changes from MakerWorld</p>
        </div>
      </div>
      <ul className="activity-list">
        {events.slice(0, 10).map((event) => (
          <li key={event.id} className="activity-item">
            <div className="activity-item__message">{event.message}</div>
            <div className="activity-item__meta">
              {new Date(event.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
