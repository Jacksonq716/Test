import React, { useState, useEffect } from 'react'
import { supabase } from './services/supabase'
import LiveSession from './components/LiveSession/LiveSession'
import HistoricalCharts from './components/HistoricalCharts/HistoricalCharts'
import DoctorNotes from './components/DoctorNotes/DoctorNotes'
import RecoveryMetrics from './components/RecoveryMetrics/RecoveryMetrics'
import DataEntry from './components/DataEntry/DataEntry'
import { Activity } from 'lucide-react'
import './App.css'

function App() {
  const [liveSession, setLiveSession] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const [doctorNotes, setDoctorNotes] = useState('')
  const [recoveryData, setRecoveryData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    loadData()
    
    // Subscribe to real-time updates
    const liveChannel = supabase
      .channel('live_session_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'live_sessions' },
        () => loadLiveSession()
      )
      .subscribe()

    const historyChannel = supabase
      .channel('historical_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'historical_sessions' },
        () => loadHistoricalData()
      )
      .subscribe()

    const notesChannel = supabase
      .channel('notes_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'doctor_notes' },
        () => loadDoctorNotes()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(liveChannel)
      supabase.removeChannel(historyChannel)
      supabase.removeChannel(notesChannel)
    }
  }, [])

  const loadData = async () => {
    await Promise.all([
      loadLiveSession(),
      loadHistoricalData(),
      loadDoctorNotes(),
      loadRecoveryData()
    ])
    setLoading(false)
  }

  const loadLiveSession = async () => {
    const { data, error } = await supabase
      .from('live_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data) {
      setLiveSession({
        patientId: data.patient_id,
        heartRate: data.heart_rate,
        rom: data.rom,
        repetitions: data.repetitions,
        targetReps: data.target_reps,
        errorFlags: data.error_flags,
        exerciseType: data.exercise_type,
        duration: data.duration
      })
    }
  }

  const loadHistoricalData = async () => {
    const { data, error } = await supabase
      .from('historical_sessions')
      .select('*')
      .order('session_number', { ascending: true })

    if (data) {
      setHistoricalData(data.map(item => ({
        sessionNumber: item.session_number,
        heartRate: item.heart_rate,
        rom: item.rom,
        repetitions: item.repetitions,
        errorFlags: item.error_flags,
        duration: item.duration,
        exerciseType: item.exercise_type
      })))
    }
  }

  const loadDoctorNotes = async () => {
    const { data, error } = await supabase
      .from('doctor_notes')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (data) setDoctorNotes(data.notes)
  }

  const loadRecoveryData = async () => {
    const { data, error } = await supabase
      .from('recovery_metrics')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (data) {
      setRecoveryData({
        recoveryRate: data.recovery_rate,
        previousRecoveryRate: data.previous_recovery_rate,
        painLevel: data.pain_level,
        previousPainLevel: data.previous_pain_level,
        functionalScore: data.functional_score,
        previousFunctionalScore: data.previous_functional_score,
        complianceRate: data.compliance_rate,
        sessionsAttended: data.sessions_attended,
        totalSessions: data.total_sessions,
        overallProgress: data.overall_progress
      })
    }
  }

  const handleUpdateLiveSession = async (newData) => {
    const sessionData = {
      ...newData,
      patient_id: 'PT-2024-001',
      exercise_type: 'Knee Extension',
      target_reps: 12,
      duration: 25
    }

    const { error } = await supabase
      .from('live_sessions')
      .insert([sessionData])

    if (!error) {
      await loadLiveSession()
    }
  }

  const handleAddSession = async (newSession) => {
    const { error } = await supabase
      .from('historical_sessions')
      .insert([{
        session_number: newSession.sessionNumber,
        heart_rate: newSession.heartRate,
        rom: newSession.rom,
        repetitions: newSession.repetitions,
        error_flags: newSession.errorFlags,
        duration: newSession.duration,
        exercise_type: newSession.exerciseType
      }])

    if (!error) {
      await loadHistoricalData()
    }
  }

  const handleSaveNotes = async (notes) => {
    const { error } = await supabase
      .from('doctor_notes')
      .upsert([{ id: 1, notes, updated_at: new Date().toISOString() }])

    if (!error) {
      setDoctorNotes(notes)
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <Activity size={48} className="loading-icon" />
        <h2>Loading PT Assessment Dashboard...</h2>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <Activity size={32} />
          <div>
            <h1>PT Assessment Dashboard</h1>
            <p>Real-time Patient Monitoring & Analysis</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-grid">
          <div className="grid-full">
            <LiveSession sessionData={liveSession} />
          </div>

          <div className="grid-half">
            <RecoveryMetrics recoveryData={recoveryData} />
          </div>

          <div className="grid-half">
            <DoctorNotes notes={doctorNotes} onSave={handleSaveNotes} />
          </div>

          <div className="grid-full">
            <HistoricalCharts historicalData={historicalData} />
          </div>
        </div>
      </main>

      <DataEntry 
        onUpdateLive={handleUpdateLiveSession}
        onAddSession={handleAddSession}
      />

      <footer className="app-footer">
        <p>PT Assessment Simulator - Test Environment</p>
        <p className="footer-note">Share this URL to enable multi-user testing</p>
      </footer>
    </div>
  )
}

export default App
