import type { AchievementItem, MetricKey } from '@/types'
import { achievementMeta } from '@/lib/achievementMeta'
import { statColors, statMeta } from '@/lib/statMeta'
import likeIcon from '@/assets/icons/icon-like-120.png'
import collectIcon from '@/assets/icons/icon-collect-120.png'
import downloadIcon from '@/assets/icons/icon-download-120.png'
import printIcon from '@/assets/icons/icon-print-120.png'
import boostIcon from '@/assets/icons/icon-boost-120.png'
import followerIcon from '@/assets/icons/icon-follower-120.png'

interface AchievementOverlayProps {
  achievement: AchievementItem
}

const iconMap: Record<string, string> = {
  heart: likeIcon,
  folder: collectIcon,
  download: downloadIcon,
  printer: printIcon,
  rocket: boostIcon,
  users: followerIcon,
}

function formatStatName(stat: MetricKey, threshold: number): string {
  const singular: Record<MetricKey, string> = {
    likes: 'like',
    collects: 'collect',
    downloads: 'download',
    prints: 'print',
    boosts: 'boost',
    followers: 'follower',
  }
  
  const plural: Record<MetricKey, string> = {
    likes: 'likes',
    collects: 'collects',
    downloads: 'downloads',
    prints: 'prints',
    boosts: 'boosts',
    followers: 'followers',
  }

  return threshold === 1 ? singular[stat] : plural[stat]
}

function formatDeltaLabel(stat: MetricKey, delta: number): string {
  const pluralNames: Record<MetricKey, string> = {
    likes: 'Likes',
    collects: 'Collects',
    downloads: 'Downloads',
    prints: 'Prints',
    boosts: 'Boosts',
    followers: 'Followers',
  }

  if (stat === 'boosts') return 'New boost!'
  if (stat === 'followers') return 'New follower!'

  return `${delta} ${pluralNames[stat]}!`
}

function StatIcon({ stat }: { stat: MetricKey }) {
  const meta = statMeta[stat]
  const iconSrc = iconMap[meta.icon]
  
  if (!iconSrc) {
    return <div className="achievement-stat-icon-placeholder" aria-hidden="true" />
  }
  
  return <img src={iconSrc} alt="" aria-hidden="true" className="achievement-stat-icon-image" />
}

export default function AchievementOverlay({ achievement }: AchievementOverlayProps) {
  const meta = achievementMeta[achievement.achievement_type as keyof typeof achievementMeta] ?? {
    emoji: '🏆',
    tone: 'default',
    label: 'Achievement unlocked',
  }
  const statColor = statColors[achievement.stat]
  const statName = formatStatName(achievement.stat, achievement.threshold)
  const deltaLabel = formatDeltaLabel(achievement.stat, achievement.delta)

  return (
    <div className="achievement-overlay" role="status" aria-live="polite">
      <div className={`achievement-card achievement-card--${meta.tone}`}>
        <span className="achievement-card__icon" aria-hidden="true" style={{ color: statColor }}>
          {meta.emoji}
        </span>
        <div className="achievement-card__content">
          <p className="achievement-card__message" style={{ color: statColor }}>{achievement.message}</p>
        </div>
        <p className="achievement-card__delta-label">{deltaLabel}</p>
        <div className="achievement-card__threshold-card">
          <div className="achievement-card__stat-icon-wrapper" style={{ color: statColor }}>
            <StatIcon stat={achievement.stat} />
          </div>
          <p className="achievement-card__threshold-label">Threshold</p>
          <p className="achievement-card__threshold-value" style={{ color: statColor }}>
            {achievement.threshold.toLocaleString()}
          </p>
          <p className="achievement-card__threshold-stat" style={{ color: statColor }}>
            {statName}
          </p>
        </div>
      </div>
    </div>
  )
}
