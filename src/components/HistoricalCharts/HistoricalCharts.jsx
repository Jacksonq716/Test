import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp } from 'lucide-react'
import './HistoricalCharts.css'

const HistoricalCharts = ({ historicalData }) => {
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="historical-charts">
        <div className="charts-header">
          <TrendingUp size={24} />
          <h2>Historical Performance</h2>
        </div>
        <p className="no-data">No historical data available</p>
      </div>
    )
  }

  return (
    <div className="historical-charts">
      <div className="charts-header">
        <TrendingUp size={24} />
        <h2>Historical Performance</h2>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>ROM Progress Over Sessions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sessionNumber" label={{ value: 'Session', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'ROM (degrees)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="rom" fill="#3b82f6" name="Range of Motion" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Heart Rate & Repetitions Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sessionNumber" label={{ value: 'Session', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="left" label={{ value: 'Heart Rate (BPM)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Repetitions', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate" />
              <Line yAxisId="right" type="monotone" dataKey="repetitions" stroke="#10b981" strokeWidth={2} name="Repetitions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Error Flags per Session</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sessionNumber" label={{ value: 'Session', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Error Count', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="errorFlags" fill="#f59e0b" name="Error Flags" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default HistoricalCharts
