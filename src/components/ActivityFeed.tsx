import type { EventItem } from '@/types'
import { statColors, statMeta } from '@/lib/statMeta'
import likeIcon from '@/assets/icons/icon-like-120.png'
import collectIcon from '@/assets/icons/icon-collect-120.png'
import downloadIcon from '@/assets/icons/icon-download-120.png'
import printIcon from '@/assets/icons/icon-print-120.png'
import boostIcon from '@/assets/icons/icon-boost-120.png'
import followerIcon from '@/assets/icons/icon-follower-120.png'

interface ActivityFeedProps {
  events?: EventItem[]
}

const iconMap: Record<string, string> = {
  heart: likeIcon,
  folder: collectIcon,
  download: downloadIcon,
  printer: printIcon,
  rocket: boostIcon,
  users: followerIcon,
}

function EventIcon({ stat }: { stat: EventItem['stat'] }) {
  const meta = statMeta[stat]
  const iconSrc = iconMap[meta.icon]
  
  if (!iconSrc) {
    return <div className="event-icon-placeholder" aria-hidden="true" />
  }
  
  return <img src={iconSrc} alt="" aria-hidden="true" className="event-icon-image" />
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
        {events.slice(0, 40).map((event) => {
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
