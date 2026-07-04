import type { EventItem } from '@/types'
import { statColors, statMeta } from '@/lib/statMeta'

interface ActivityFeedProps {
  events?: EventItem[]
}

function EventIcon({ stat }: { stat: EventItem['stat'] }) {
  const meta = statMeta[stat]

  switch (meta.icon) {
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7.5-4.35-10-8.5C-0.5 9 1.5 5 4.5 5c1.4 0 2.8.7 3.5 1.8C8.7 5.7 10.1 5 11.5 5 14.5 5 16.5 9 16 12.5 14.5 16.65 12 21 12 21z" />
        </svg>
      )
    case 'folder':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        </svg>
      )
    case 'download':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 17h14" />
        </svg>
      )
    case 'printer':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9V4h12v5M6 14v6h12v-6M6 14h12" />
        </svg>
      )
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 18s4-1 6-3 3-6 3-6 1 1 2 2c1 1 1.5 3 1.5 3s-2 0-4 1c-2 1-4 3-4 3zM4 20c1-2 3-3 3-3" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 11a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-4 9s1-4 5-4 5 4 5 4" />
        </svg>
      )
    default:
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /></svg>
  }
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  if (!events?.length) {
    return (
      <section className="activity-panel">
        <div className="activity-panel__header">
          <div>
            <h2>Recent activity</h2>
          </div>
        </div>
        <div className="empty-state">Waiting for recent activity…</div>
      </section>
    )
  }

  return (
    <section className="activity-panel">
      <div className="activity-panel__header">
        <div>
          <p className="panel-eyebrow dashboard-title">Recent activity</p>
        </div>
      </div>
      <ul className="activity-list">
        {events.slice(0, 35).map((event) => {
          const timeString = new Date(event.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          const statColor = statColors[event.stat]

          return (
            <li key={event.id} className="activity-item">
              <div className={`activity-icon activity-icon--${event.stat}`} style={{ color: statColor }}>
                <EventIcon stat={event.stat} />
              </div>
              <span className="activity-item__time" style={{ color: '#FFFFFF' }}>{timeString}</span>
              <span className="activity-item__message" style={{ color: statColor }}>{event.message}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
