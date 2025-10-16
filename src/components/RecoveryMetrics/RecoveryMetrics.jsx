import React from 'react'
import { Heart, Zap, Target, TrendingUp } from 'lucide-react'
import './RecoveryMetrics.css'

const RecoveryMetrics = ({ recoveryData }) => {
  if (!recoveryData) {
    return (
      <div className="recovery-metrics">
        <h2>Recovery Metrics</h2>
        <p className="no-data">No recovery data available</p>
      </div>
    )
  }

  const calculateTrend = (current, previous) => {
    if (!previous) return 0
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp size={16} className="trend-up" />
    if (trend < 0) return <TrendingUp size={16} className="trend-down" />
    return null
  }

  return (
    <div className="recovery-metrics">
      <div className="recovery-header">
        <Heart size={24} />
        <h2>Recovery Metrics</h2>
      </div>

      <div className="recovery-grid">
        <div className="recovery-card">
          <div className="card-icon" style={{ background: '#fee2e2' }}>
            <Heart size={24} color="#ef4444" />
          </div>
          <div className="card-content">
            <div className="card-label">Recovery Rate</div>
            <div className="card-value">
              {recoveryData.recoveryRate}%
              {getTrendIcon(calculateTrend(recoveryData.recoveryRate, recoveryData.previousRecoveryRate))}
            </div>
            <div className="card-trend">
              {calculateTrend(recoveryData.recoveryRate, recoveryData.previousRecoveryRate)}% from last week
            </div>
          </div>
        </div>

        <div className="recovery-card">
          <div className="card-icon" style={{ background: '#dbeafe' }}>
            <Zap size={24} color="#3b82f6" />
          </div>
          <div className="card-content">
            <div className="card-label">Pain Level</div>
            <div className="card-value">
              {recoveryData.painLevel}/10
              {getTrendIcon(-calculateTrend(recoveryData.painLevel, recoveryData.previousPainLevel))}
            </div>
            <div className="card-trend">
              {Math.abs(calculateTrend(recoveryData.painLevel, recoveryData.previousPainLevel))}% change
            </div>
          </div>
        </div>

        <div className="recovery-card">
          <div className="card-icon" style={{ background: '#d1fae5' }}>
            <Target size={24} color="#10b981" />
          </div>
          <div className="card-content">
            <div className="card-label">Functional Score</div>
            <div className="card-value">
              {recoveryData.functionalScore}/100
              {getTrendIcon(calculateTrend(recoveryData.functionalScore, recoveryData.previousFunctionalScore))}
            </div>
            <div className="card-trend">
              {calculateTrend(recoveryData.functionalScore, recoveryData.previousFunctionalScore)}% improvement
            </div>
          </div>
        </div>

        <div className="recovery-card">
          <div className="card-icon" style={{ background: '#fef3c7' }}>
            <TrendingUp size={24} color="#f59e0b" />
          </div>
          <div className="card-content">
            <div className="card-label">Compliance Rate</div>
            <div className="card-value">
              {recoveryData.complianceRate}%
            </div>
            <div className="card-trend">
              Sessions attended: {recoveryData.sessionsAttended}/{recoveryData.totalSessions}
            </div>
          </div>
        </div>
      </div>

      <div className="recovery-summary">
        <h3>Overall Assessment</h3>
        <div className="assessment-bar">
          <div 
            className="assessment-fill" 
            style={{ 
              width: `${recoveryData.overallProgress}%`,
              background: recoveryData.overallProgress > 70 ? '#10b981' : recoveryData.overallProgress > 40 ? '#f59e0b' : '#ef4444'
            }}
          ></div>
        </div>
        <p className="assessment-text">
          Overall progress: <strong>{recoveryData.overallProgress}%</strong>
        </p>
      </div>
    </div>
  )
}

export default RecoveryMetrics
