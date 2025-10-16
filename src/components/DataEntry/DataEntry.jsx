import React, { useState } from 'react'
import { PlusCircle, X } from 'lucide-react'
import './DataEntry.css'

const DataEntry = ({ onAddSession, onUpdateLive }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('live') // 'live' or 'session'
  
  const [liveData, setLiveData] = useState({
    heartRate: '',
    rom: '',
    repetitions: '',
    errorFlags: ''
  })

  const [sessionData, setSessionData] = useState({
    sessionNumber: '',
    heartRate: '',
    rom: '',
    repetitions: '',
    errorFlags: '',
    duration: '',
    exerciseType: ''
  })

  const handleLiveUpdate = async (e) => {
    e.preventDefault()
    await onUpdateLive({
      heartRate: parseInt(liveData.heartRate),
      rom: parseInt(liveData.rom),
      repetitions: parseInt(liveData.repetitions),
      errorFlags: parseInt(liveData.errorFlags)
    })
    setLiveData({ heartRate: '', rom: '', repetitions: '', errorFlags: '' })
    setIsOpen(false)
  }

  const handleSessionAdd = async (e) => {
    e.preventDefault()
    await onAddSession({
      sessionNumber: parseInt(sessionData.sessionNumber),
      heartRate: parseInt(sessionData.heartRate),
      rom: parseInt(sessionData.rom),
      repetitions: parseInt(sessionData.repetitions),
      errorFlags: parseInt(sessionData.errorFlags),
      duration: parseInt(sessionData.duration),
      exerciseType: sessionData.exerciseType
    })
    setSessionData({
      sessionNumber: '',
      heartRate: '',
      rom: '',
      repetitions: '',
      errorFlags: '',
      duration: '',
      exerciseType: ''
    })
    setIsOpen(false)
  }

  return (
    <>
      <button className="fab" onClick={() => setIsOpen(true)}>
        <PlusCircle size={24} />
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add/Update Data</h2>
              <button className="btn-close" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Update Live Session
              </button>
              <button 
                className={`tab ${activeTab === 'session' ? 'active' : ''}`}
                onClick={() => setActiveTab('session')}
              >
                Add Historical Session
              </button>
            </div>

            {activeTab === 'live' ? (
              <form className="data-form" onSubmit={handleLiveUpdate}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Heart Rate (BPM)</label>
                    <input
                      type="number"
                      value={liveData.heartRate}
                      onChange={(e) => setLiveData({...liveData, heartRate: e.target.value})}
                      placeholder="e.g., 95"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>ROM (degrees)</label>
                    <input
                      type="number"
                      value={liveData.rom}
                      onChange={(e) => setLiveData({...liveData, rom: e.target.value})}
                      placeholder="e.g., 120"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Repetitions</label>
                    <input
                      type="number"
                      value={liveData.repetitions}
                      onChange={(e) => setLiveData({...liveData, repetitions: e.target.value})}
                      placeholder="e.g., 8"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Error Flags</label>
                    <input
                      type="number"
                      value={liveData.errorFlags}
                      onChange={(e) => setLiveData({...liveData, errorFlags: e.target.value})}
                      placeholder="e.g., 2"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Update Live Data
                </button>
              </form>
            ) : (
              <form className="data-form" onSubmit={handleSessionAdd}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Session Number</label>
                    <input
                      type="number"
                      value={sessionData.sessionNumber}
                      onChange={(e) => setSessionData({...sessionData, sessionNumber: e.target.value})}
                      placeholder="e.g., 5"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Heart Rate (BPM)</label>
                    <input
                      type="number"
                      value={sessionData.heartRate}
                      onChange={(e) => setSessionData({...sessionData, heartRate: e.target.value})}
                      placeholder="e.g., 95"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>ROM (degrees)</label>
                    <input
                      type="number"
                      value={sessionData.rom}
                      onChange={(e) => setSessionData({...sessionData, rom: e.target.value})}
                      placeholder="e.g., 120"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Repetitions</label>
                    <input
                      type="number"
                      value={sessionData.repetitions}
                      onChange={(e) => setSessionData({...sessionData, repetitions: e.target.value})}
                      placeholder="e.g., 10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Error Flags</label>
                    <input
                      type="number"
                      value={sessionData.errorFlags}
                      onChange={(e) => setSessionData({...sessionData, errorFlags: e.target.value})}
                      placeholder="e.g., 1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={sessionData.duration}
                      onChange={(e) => setSessionData({...sessionData, duration: e.target.value})}
                      placeholder="e.g., 30"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Exercise Type</label>
                    <input
                      type="text"
                      value={sessionData.exerciseType}
                      onChange={(e) => setSessionData({...sessionData, exerciseType: e.target.value})}
                      placeholder="e.g., Knee Extension"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Add Session
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default DataEntry
