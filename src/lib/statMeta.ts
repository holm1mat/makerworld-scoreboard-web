import type { MetricKey } from '@/types'

export const STAT_ORDER = ['likes', 'collects', 'downloads', 'prints', 'boosts', 'followers'] as const

export const statColors: Record<MetricKey, string> = {
  likes: '#FF4D4D',
  collects: '#FFC61A',
  downloads: '#23B5FF',
  prints: '#39E75F',
  boosts: '#B05CFF',
  followers: '#35D8FF',
}

export const statMeta = {
  likes: { label: 'Likes', shortLabel: 'Likes', tone: 'primary', icon: 'heart' },
  collects: { label: 'Collects', shortLabel: 'Collects', tone: 'success', icon: 'folder' },
  downloads: { label: 'Downloads', shortLabel: 'Downloads', tone: 'info', icon: 'download' },
  prints: { label: 'Prints', shortLabel: 'Prints', tone: 'accent', icon: 'printer' },
  boosts: { label: 'Boosts', shortLabel: 'Boosts', tone: 'boost', icon: 'rocket' },
  followers: { label: 'Followers', shortLabel: 'Followers', tone: 'social', icon: 'users' },
}
