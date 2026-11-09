import { useEffect, useMemo, useState } from 'react'

import Header from './components/header/Header'
import MapView from './components/map/MapView'
import ActivityDetails from './components/activity/ActivityDetails'
import ActivityFilters from './components/filter/ActivityFilters'

import {getActivities} from './services/AFAService'
import academicCalendar from './data/academicCalendar.json'

import './App.css'

function App() {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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

  function handleAcademicYearChange(yearId) {
    setSelectedAcademicYear(yearId)
    setSelectedSemester('')
  }
  
const filteredActivities = useMemo(() => {
    let filteredStartDate = null
    let filteredEndDate = null

    const year = academicCalendar.find(
        (item) => item.id === selectedAcademicYear
    )

    if (year) {
        filteredStartDate = year.start_date
        filteredEndDate = year.end_date
    }

    if (selectedSemester && year) {
        const semester = year.semesters.find(
            (item) => item.id === selectedSemester
        )

        if (semester) {
            filteredStartDate = semester.start_date
            filteredEndDate = semester.end_date
        }
    }

    // Apply custom start date
    if (startDate) {
        filteredStartDate = filteredStartDate ? (startDate > filteredStartDate ? startDate : filteredStartDate) : startDate
    }

    // Apply custom end date
    if (endDate) {
        filteredEndDate = filteredEndDate ? (endDate < filteredEndDate ? endDate : filteredEndDate) : endDate
    }

    // No active filters
    if (!filteredStartDate && !filteredEndDate) {
        return activities
    }

    return activities.filter((activity) => {
        return (
            (!filteredEndDate || activity.start_date <= filteredEndDate) &&
            (!filteredStartDate || activity.end_date >= filteredStartDate)
        )
    })
}, [ activities, selectedAcademicYear, selectedSemester, startDate, endDate ])

  useEffect(() => {
    if (
      selectedActivity && !filteredActivities.some((activity) => activity.id === selectedActivity.id)
    ) {
      setSelectedActivity(null)
    }
  }, [filteredActivities, selectedActivity])

  function handleClearFilters() {
    setSelectedAcademicYear('')
    setSelectedSemester('')
    setStartDate('')
    setEndDate('')
  }

  return(
    <div className="app">
      <Header 
        activityCount={filteredActivities.length}
        loading={loading}
        error={error}
      />

      <div className="activity-filter-bar">
          <ActivityFilters
              selectedAcademicYear={selectedAcademicYear}
              selectedSemester={selectedSemester}
              onAcademicYearChange={handleAcademicYearChange}
              onSemesterChange={setSelectedSemester}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onClearFilters={handleClearFilters}
          />
      </div>

      <main className="app-main">
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
        <MapView 
          activities={filteredActivities}
          onSelectActivity={setSelectedActivity}
        />
      </main>
    </div>
  )
}

export default App
