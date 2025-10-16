import React from 'react'
import { Heart, Target, Activity, AlertCircle, TrendingUp, Clock } from 'lucide-react'
import './PatientMetrics.css'

const PatientMetrics = ({ patient, liveData }) => {
  if (!patient) {
    return (
      <div className="patient-metrics empty">
        <p>Select a patient to view metrics</p>
      </div>
    )
  }

  const getHeartRateStatus = (hr) => {
    if (hr > 120) return 'danger'
    if (hr > 100) return 'warning'
    return 'normal'
  }

  const getAccuracyStatus = (accuracy) => {
    if (accuracy >= 90) return 'excellent'
    if (accuracy >= 75) return 'good'
    return 'needs-improvement'
  }

  return (
    <div className="patient-metrics">
      {/* Patient Info */}
      <div className="patient-info-card">
        <div className="patient-avatar">
          {patient.name.charAt(0).toUpperCase()}
        </div>
        <div className="patient-details">
          <h2 className="patient-name">{patient.name}</h2>
          <div className="patient-meta">
            <span className="meta-item">Age: {patient.age}</span>
            <span className="meta-separator">•</span>
            <span className="meta-item">ID: {patient.id}</span>
          </div>
          <div className="patient-diagnosis">
            {patient.diagnosis || 'ACL Reconstruction - Week 6'}
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="metrics-section">
        <h3 className="section-title">
          <Activity size={18} />
          Real-time Metrics
        </h3>

        <div className="metrics-grid">
          {/* Heart Rate */}
          <div className={`metric-card ${getHeartRateStatus(liveData?.heartRate || 0)}`}>
            <div className="metric-icon heart">
              <Heart size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Heart Rate</div>
              <div className="metric-value">
                {liveData?.heartRate || '--'}
                <span className="metric-unit">BPM</span>
              </div>
            </div>
          </div>

          {/* Accuracy */}
          <div className={`metric-card ${getAccuracyStatus(liveData?.accuracy || 0)}`}>
            <div className="metric-icon accuracy">
              <Target size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Accuracy</div>
              <div className="metric-value">
                {liveData?.accuracy || '--'}
                <span className="metric-unit">%</span>
              </div>
            </div>
          </div>

          {/* ROM */}
          <div className="metric-card">
            <div className="metric-icon rom">
              <TrendingUp size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">ROM</div>
              <div className="metric-value">
                {liveData?.rom || '--'}
                <span className="metric-unit">°</span>
              </div>
            </div>
          </div>

          {/* Repetitions */}
          <div className="metric-card">
            <div className="metric-icon reps">
              <Activity size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Repetitions</div>
              <div className="metric-value">
                {liveData?.repetitions || '--'}
                <span className="metric-unit">/ {liveData?.targetReps || 12}</span>
              </div>
            </div>
          </div>

          {/* Error Flags */}
          <div className={`metric-card ${(liveData?.errorFlags || 0) > 0 ? 'warning' : ''}`}>
            <div className="metric-icon errors">
              <AlertCircle size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Error Flags</div>
              <div className="metric-value">
                {liveData?.errorFlags || 0}
              </div>
              {(liveData?.errorFlags || 0) > 0 && (
                <div className="metric-warning">Compensation detected</div>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="metric-card">
            <div className="metric-icon duration">
              <Clock size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-label">Duration</div>
              <div className="metric-value">
                {liveData?.duration || '--'}
                <span className="metric-unit">min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Progress */}
      <div className="progress-section">
        <h3 className="section-title">Session Progress</h3>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${((liveData?.repetitions || 0) / (liveData?.targetReps || 12)) * 100}%` 
            }}
          >
            <span className="progress-text">
              {Math.round(((liveData?.repetitions || 0) / (liveData?.targetReps || 12)) * 100)}%
            </span>
          </div>
        </div>
        <div className="progress-info">
          <span>{liveData?.repetitions || 0} of {liveData?.targetReps || 12} reps completed</span>
        </div>
      </div>

      {/* Exercise Info */}
      <div className="exercise-info">
        <div className="info-row">
          <span className="info-label">Current Exercise:</span>
          <span className="info-value">{liveData?.exerciseType || 'Knee Extension'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Session Date:</span>
          <span className="info-value">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default PatientMetrics
