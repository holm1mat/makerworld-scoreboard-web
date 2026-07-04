export const STAT_ORDER = ['likes', 'collects', 'downloads', 'prints', 'boosts', 'followers'] as const

export const statMeta = {
  likes: { label: 'Likes', shortLabel: 'Likes', tone: 'primary', icon: 'heart' },
  collects: { label: 'Collects', shortLabel: 'Collects', tone: 'success', icon: 'folder' },
  downloads: { label: 'Downloads', shortLabel: 'Downloads', tone: 'info', icon: 'download' },
  prints: { label: 'Prints', shortLabel: 'Prints', tone: 'accent', icon: 'printer' },
  boosts: { label: 'Boosts', shortLabel: 'Boosts', tone: 'boost', icon: 'rocket' },
  followers: { label: 'Followers', shortLabel: 'Followers', tone: 'social', icon: 'users' },
}
