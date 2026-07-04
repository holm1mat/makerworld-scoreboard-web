import type { EventItem } from '@/types'
import { getJson } from '@/api/client'

export async function fetchEvents(): Promise<EventItem[]> {
  return getJson<EventItem[]>('/events')
}
