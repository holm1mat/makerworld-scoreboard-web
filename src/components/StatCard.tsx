import type { MetricKey, MetricSummary } from '@/types'
import { statColors } from '@/lib/statMeta'

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

function StatIcon({ icon }: { icon: string }) {
  switch (icon) {
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
