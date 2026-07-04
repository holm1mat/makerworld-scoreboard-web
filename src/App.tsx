import Dashboard from '@/components/Dashboard'
import AchievementOverlay from '@/components/AchievementOverlay'
import { useAchievementQueue } from '@/hooks/useAchievementQueue'
import { useEvents } from '@/hooks/useEvents'
import { useScoreboard } from '@/hooks/useScoreboard'
import './App.css'

function App() {
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

export default App
