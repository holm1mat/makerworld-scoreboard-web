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
  const connectionLabel = loading && !scoreboard ? 'Connecting to backend…' : scoreboard ? 'Connected to backend' : 'Waiting for backend response'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">MakerWorld Scoreboard</p>
          <h1 className="app-title">Live dashboard</h1>
          <p className="app-description">
            Watch totals, activity, and achievement takeovers from your backend.
          </p>
        </div>
      </header>

      <div className="backend-status">
        <span>{connectionLabel}</span>
        {scoreboard ? (
          <span>
            · {events?.length ?? 0} recent events loaded · handle {scoreboard.handle}
          </span>
        ) : null}
      </div>

      {errorMessage ? <div className="app-banner">{errorMessage}</div> : null}

      <main className="app-main">
        <Dashboard scoreboard={scoreboard} events={events} loading={loading} />
      </main>

      {activeAchievement ? <AchievementOverlay achievement={activeAchievement} /> : null}
    </div>
  )
}

export default App
