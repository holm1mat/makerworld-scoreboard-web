import { useEffect, useState } from 'react'
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
  const [displayedAchievement, setDisplayedAchievement] = useState(achievement)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // When achievement changes, play exit animation first
    if (achievement.id !== displayedAchievement.id) {
      setIsExiting(true)
      
      // After exit animation completes (300ms), update achievement and play entry
      const timer = window.setTimeout(() => {
        setDisplayedAchievement(achievement)
        setIsExiting(false)
      }, 300)

      return () => window.clearTimeout(timer)
    }
  }, [achievement.id, displayedAchievement.id])

  const meta = achievementMeta[displayedAchievement.achievement_type as keyof typeof achievementMeta] ?? {
    emoji: '🏆',
    tone: 'default',
    label: 'Achievement unlocked',
  }
  const statColor = statColors[displayedAchievement.stat]
  const statName = formatStatName(displayedAchievement.stat, displayedAchievement.threshold)
  const deltaLabel = formatDeltaLabel(displayedAchievement.stat, displayedAchievement.delta)

  return (
    <div className="achievement-overlay" role="status" aria-live="polite">
      <div className={`achievement-card achievement-card--${meta.tone} ${isExiting ? 'achievement-card--exiting' : ''}`}>
        <div className="achievement-card__icon" style={{ color: statColor }}>
          <StatIcon stat={displayedAchievement.stat} />
        </div>
        <div className="achievement-card__content">
          <p className="achievement-card__message" style={{ color: statColor }}>{displayedAchievement.message}</p>
        </div>
        <p className="achievement-card__delta-label">{deltaLabel}</p>
        <div className="achievement-card__threshold-card">
          <p className="achievement-card__threshold-label">Threshold</p>
          <p className="achievement-card__threshold-value" style={{ color: statColor }}>
            {displayedAchievement.threshold.toLocaleString()}
          </p>
          <p className="achievement-card__threshold-stat" style={{ color: statColor }}>
            {statName}
          </p>
        </div>
      </div>
    </div>
  )
}
