export const STAT_ORDER = ['likes', 'collects', 'downloads', 'prints', 'boosts', 'followers'] as const

export const statMeta = {
  likes: { label: 'Likes', shortLabel: 'Likes', tone: 'primary' },
  collects: { label: 'Collects', shortLabel: 'Collects', tone: 'success' },
  downloads: { label: 'Downloads', shortLabel: 'Downloads', tone: 'info' },
  prints: { label: 'Prints', shortLabel: 'Prints', tone: 'accent' },
  boosts: { label: 'Boosts', shortLabel: 'Boosts', tone: 'boost' },
  followers: { label: 'Followers', shortLabel: 'Followers', tone: 'social' },
}
