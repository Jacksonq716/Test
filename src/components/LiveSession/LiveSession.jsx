import React from 'react'
import { Activity, AlertCircle, RefreshCw } from 'lucide-react'
import './LiveSession.css'

const LiveSession = ({ sessionData }) => {
  if (!sessionData) {
    return (
      <div className="live-session loading">
        <RefreshCw className="icon-spin" />
        <p>Loading live session data...</p>
      </div>
    )
  }

  const getStatusColor = (value, threshold) => {
    if (value > threshold) return '#ef4444'
    if (value > threshold * 0.8) return '#f59e0b'
    return '#10b981'
  }

  return (
    <div className="live-session">
      <div className="session-header">
        <Activity size={24} />
        <h2>Live Session Monitor</h2>
        <span className="live-indicator">● LIVE</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Heart Rate</div>
          <div className="metric-value" style={{ color: getStatusColor(sessionData.heartRate, 120) }}>
            {sessionData.heartRate}
            <span className="metric-unit">BPM</span>
          </div>
          <div className="metric-status">
            {sessionData.heartRate > 120 ? 'Elevated' : 'Normal'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Range of Motion (ROM)</div>
          <div className="metric-value">
            {sessionData.rom}
            <span className="metric-unit">°</span>
          </div>
          <div className="metric-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${(sessionData.rom / 180) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Repetitions</div>
          <div className="metric-value">
            {sessionData.repetitions}
            <span className="metric-unit">/ {sessionData.targetReps}</span>
          </div>
          <div className="metric-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${(sessionData.repetitions / sessionData.targetReps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Error Flags</div>
          <div className="metric-value" style={{ color: sessionData.errorFlags > 0 ? '#ef4444' : '#10b981' }}>
            {sessionData.errorFlags}
          </div>
          {sessionData.errorFlags > 0 && (
            <div className="error-list">
              <AlertCircle size={16} />
              <span>Compensation detected</span>
            </div>
          )}
        </div>
      </div>

      <div className="session-info">
        <div className="info-item">
          <span className="info-label">Patient ID:</span>
          <span className="info-value">{sessionData.patientId}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Exercise:</span>
          <span className="info-value">{sessionData.exerciseType}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Duration:</span>
          <span className="info-value">{sessionData.duration} min</span>
        </div>
      </div>
    </div>
  )
}

export default LiveSession
