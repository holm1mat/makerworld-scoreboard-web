import type { AchievementItem } from '@/types'
import { achievementMeta } from '@/lib/achievementMeta'
import { statColors } from '@/lib/statMeta'

interface AchievementOverlayProps {
  achievement: AchievementItem
}

export default function AchievementOverlay({ achievement }: AchievementOverlayProps) {
  const meta = achievementMeta[achievement.achievement_type] ?? {
    emoji: '🏆',
    tone: 'default',
    label: 'Achievement unlocked',
  }
  const statColor = statColors[achievement.stat]

  return (
    <div className="achievement-overlay" role="status" aria-live="polite">
      <div className={`achievement-card achievement-card--${meta.tone}`}>
        <span className="achievement-card__icon" aria-hidden="true" style={{ color: statColor }}>
          {meta.emoji}
        </span>
        <div className="achievement-card__content">
          <p className="achievement-card__message" style={{ color: statColor }}>{achievement.message}</p>
          <p className="achievement-card__meta" style={{ color: statColor }}>
            {meta.label} · {achievement.current_value.toLocaleString()} {achievement.stat}
          </p>
        </div>
        <span className="achievement-card__delta" style={{ color: statColor }}>+{achievement.delta}</span>
      </div>
    </div>
  )
}
