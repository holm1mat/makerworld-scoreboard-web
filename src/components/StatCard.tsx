import type { MetricSummary } from '@/types'

interface StatCardProps {
  summary: MetricSummary
  meta: {
    label: string
    shortLabel: string
    tone: string
  }
}

export default function StatCard({ summary, meta }: StatCardProps) {
  const todayValue = summary.today
  const todayLabel = todayValue === 0 ? '0 today' : `${todayValue > 0 ? '+' : ''}${todayValue} today`

  return (
    <article className={`stat-card stat-card--${meta.tone}`}>
      <div className="stat-card__header">
        <p className="stat-card__label">{meta.label}</p>
        <p className="stat-card__today">{todayLabel}</p>
      </div>
      <div className="stat-card__total">{summary.total.toLocaleString()}</div>
      <div className="stat-card__details">
        <span>{summary.lastHour.toLocaleString()} / 1h</span>
        <span>{summary.last7Days.toLocaleString()} / 7d</span>
      </div>
    </article>
  )
}
