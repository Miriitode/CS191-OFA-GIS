import { useEffect, useState } from 'react'

import Header from './components/header/Header'
import MapView from './components/map/MapView'
import ActivityDetails from './components/activity/ActivityDetails'

import {getActivities} from './services/AFAService'

import './App.css'

function App() {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getActivities()
        setActivities(data)
      } catch (err) {
        console.error('Failed to load activities:', err)
        setError('failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return(
    <div className="app">
      <Header 
        activityCount={activities.length}
        loading={loading}
        error={error}
      />

      <main className="app-main">
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
        <MapView 
          activities={activities}
          onSelectActivity={setSelectedActivity}
        />
      </main>
    </div>
  )
}

export default App
