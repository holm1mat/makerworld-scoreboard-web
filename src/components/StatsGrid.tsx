import type { MetricKey, MetricSummary } from '@/types'
import { STAT_ORDER, statMeta } from '@/lib/statMeta'
import StatCard from '@/components/StatCard'

interface StatsGridProps {
  stats: Record<MetricKey, MetricSummary>
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="stats-grid" aria-label="Scoreboard totals">
      {STAT_ORDER.map((metric) => {
        const summary = stats[metric]
        const meta = statMeta[metric]

        return <StatCard key={metric} summary={summary} meta={meta} stat={metric} />
      })}
    </section>
  )
}
