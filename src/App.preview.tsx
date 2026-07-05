import { useEffect, useState } from 'react'
import DashboardPreview from '@/components/DashboardPreview'
import { mockAchievements, mockEvents, mockScoreboard } from '@/lib/mockData'

const CYCLE_INTERVAL_MS = 4000

export default function AppPreview() {
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [isAutoCycling, setIsAutoCycling] = useState(true)

  const currentAchievement = mockAchievements[achievementIndex]
  const totalAchievements = mockAchievements.length

  useEffect(() => {
    if (!isAutoCycling) return

    const timer = window.setInterval(() => {
      setAchievementIndex((prev) => (prev + 1) % totalAchievements)
    }, CYCLE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [isAutoCycling, totalAchievements])

  const handlePrevious = () => {
    setAchievementIndex((prev) => (prev - 1 + totalAchievements) % totalAchievements)
    setIsAutoCycling(false)
  }

  const handleNext = () => {
    setAchievementIndex((prev) => (prev + 1) % totalAchievements)
    setIsAutoCycling(false)
  }

  const handleToggleCycle = () => {
    setIsAutoCycling(!isAutoCycling)
  }

  return (
    <div className="app-shell">
      <DashboardPreview
        scoreboard={mockScoreboard}
        events={mockEvents}
        achievement={currentAchievement}
      />

      <div className="preview-controls">
        <div className="preview-controls__info">
          <span>Achievement {achievementIndex + 1} of {totalAchievements}</span>
          <span>{currentAchievement.message}</span>
        </div>
        <div className="preview-controls__buttons">
          <button 
            className="preview-controls__button" 
            onClick={handlePrevious}
            aria-label="Previous achievement"
          >
            ← Prev
          </button>
          <button 
            className="preview-controls__button" 
            onClick={handleToggleCycle}
            aria-label={isAutoCycling ? 'Pause auto-cycle' : 'Resume auto-cycle'}
          >
            {isAutoCycling ? '⏸ Pause' : '▶ Resume'}
          </button>
          <button 
            className="preview-controls__button" 
            onClick={handleNext}
            aria-label="Next achievement"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
