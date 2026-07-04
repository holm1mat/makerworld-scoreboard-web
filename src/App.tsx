import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import AchievementOverlay from '@/components/AchievementOverlay'
import { useAchievementQueue } from '@/hooks/useAchievementQueue'
import { useEvents } from '@/hooks/useEvents'
import { useScoreboard } from '@/hooks/useScoreboard'
import { mockAchievements, mockEvents, mockScoreboard } from '@/lib/mockData'
import './App.css'

function usePreviewMode() {
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const shouldPreview =
      params.get('mock') === '1' ||
      params.get('preview') === '1' ||
      import.meta.env.VITE_USE_MOCKS === 'true'

    setIsPreview(shouldPreview)
  }, [])

  return isPreview
}

function PreviewApp() {
  const [achievementIndex, setAchievementIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAchievementIndex((prev) => (prev + 1) % mockAchievements.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="app-shell">
      <main className="app-main">
        <Dashboard
          scoreboard={mockScoreboard}
          events={mockEvents}
          loading={false}
          connectionState="live"
        />
      </main>

      <AchievementOverlay achievement={mockAchievements[achievementIndex]} />
    </div>
  )
}

function LiveApp() {
  const { scoreboard, loading, error: scoreboardError } = useScoreboard()
  const { events, error: eventsError } = useEvents()
  const { activeAchievement, error: achievementError } = useAchievementQueue()
  const errorMessage = scoreboardError || eventsError || achievementError
  const hasError = Boolean(scoreboardError)
  const connectionState = loading && !scoreboard ? 'connecting' : hasError ? 'disconnected' : 'live'

  return (
    <div className="app-shell">
      {errorMessage ? <div className="app-banner">{errorMessage}</div> : null}

      <main className="app-main">
        <Dashboard
          scoreboard={scoreboard}
          events={events}
          loading={loading}
          connectionState={connectionState}
        />
      </main>

      {activeAchievement ? <AchievementOverlay achievement={activeAchievement} /> : null}
    </div>
  )
}

function App() {
  const isPreview = usePreviewMode()

  return isPreview ? <PreviewApp /> : <LiveApp />
}

export default App
