import type { MetricKey, MetricSummary } from '@/types'
import { statColors } from '@/lib/statMeta'
import likeIcon from '@/assets/icons/icon-like-120.png'
import collectIcon from '@/assets/icons/icon-collect-120.png'
import downloadIcon from '@/assets/icons/icon-download-120.png'
import printIcon from '@/assets/icons/icon-print-120.png'
import boostIcon from '@/assets/icons/icon-boost-120.png'
import followerIcon from '@/assets/icons/icon-follower-120.png'

interface StatCardProps {
  summary: MetricSummary
  meta: {
    label: string
    shortLabel: string
    tone: string
    icon: string
  }
  stat: MetricKey
}

const iconMap: Record<string, string> = {
  heart: likeIcon,
  folder: collectIcon,
  download: downloadIcon,
  printer: printIcon,
  rocket: boostIcon,
  users: followerIcon,
}

function StatIcon({ icon }: { icon: string }) {
  const iconSrc = iconMap[icon]
  if (!iconSrc) {
    return <div className="stat-icon-placeholder" aria-hidden="true" />
  }
  return <img src={iconSrc} alt="" aria-hidden="true" className="stat-icon-image" />
}

export default function StatCard({ summary, meta, stat }: StatCardProps) {
  const todayValue = summary.today
  const todayLabel = todayValue === 0 ? '0' : `${todayValue > 0 ? '+' : ''}${todayValue}`
  const statColor = statColors[stat]

  return (
    <article className={`stat-card stat-card--${meta.tone}`}>
      <div className="stat-card__icon" style={{ color: statColor }}>
        <StatIcon icon={meta.icon} />
      </div>
      <p className="stat-card__label" style={{ color: '#FFFFFF' }}>{meta.label}</p>
      <p className="stat-card__total" style={{ color: statColor }}>{summary.total.toLocaleString()}</p>
      <div className="stat-card__today-block">
        <p className="stat-card__today" style={{ color: statColor }}>{todayLabel}</p>
        <p className="stat-card__today-label" style={{ color: '#FFFFFF' }}>TODAY</p>
      </div>
    </article>
  )
}
