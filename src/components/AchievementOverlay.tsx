import type { AchievementItem } from '@/types'
import { achievementMeta } from '@/lib/achievementMeta'

interface AchievementOverlayProps {
  achievement: AchievementItem
}

export default function AchievementOverlay({ achievement }: AchievementOverlayProps) {
  const meta = achievementMeta[achievement.achievement_type] ?? {
    emoji: '🏆',
    tone: 'default',
    label: 'Achievement unlocked',
  }

  return (
    <div className="achievement-overlay" role="status" aria-live="polite">
      <div className={`achievement-card achievement-card--${meta.tone}`}>
        <span className="achievement-card__icon" aria-hidden="true">
          {meta.emoji}
        </span>
        <div className="achievement-card__content">
          <p className="achievement-card__message">{achievement.message}</p>
          <p className="achievement-card__meta">
            {meta.label} · {achievement.current_value.toLocaleString()} {achievement.stat}
          </p>
        </div>
        <span className="achievement-card__delta">+{achievement.delta}</span>
      </div>
    </div>
  )
}
