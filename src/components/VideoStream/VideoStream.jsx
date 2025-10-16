import React, { useRef, useState, useEffect } from 'react'
import { Video, VideoOff, Play, Pause, Maximize2 } from 'lucide-react'
import './VideoStream.css'

const VideoStream = ({ patientId, isLive = true }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStream, setHasStream] = useState(false)
  const [error, setError] = useState(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setHasStream(true)
        setIsPlaying(true)
        setError(null)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Using demo mode.')
      // Use demo video
      if (videoRef.current) {
        videoRef.current.src = 'https://www.w3schools.com/html/mov_bbb.mp4'
        videoRef.current.loop = true
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setHasStream(false)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="video-stream">
      <div className="video-header">
        <div className="stream-indicator">
          {isLive && hasStream && (
            <>
              <span className="live-dot"></span>
              <span className="live-text">LIVE</span>
            </>
          )}
          {!hasStream && <span className="offline-text">Camera Off</span>}
        </div>
        <div className="video-title">Patient Video Stream</div>
      </div>

      <div className="video-container">
        {!hasStream && !error && (
          <div className="video-placeholder">
            <VideoOff size={64} />
            <p>Camera not started</p>
            <button className="btn-start-camera" onClick={startCamera}>
              <Video size={20} />
              Start Camera
            </button>
          </div>
        )}

        {error && (
          <div className="video-error">
            <VideoOff size={48} />
            <p>{error}</p>
          </div>
        )}

        <video
          ref={videoRef}
          className={`video-player ${hasStream || error ? 'active' : ''}`}
          autoPlay
          playsInline
          muted
        />
      </div>

      {hasStream && (
        <div className="video-controls">
          <button className="control-btn" onClick={togglePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button className="control-btn" onClick={stopCamera}>
            <VideoOff size={20} />
            Stop
          </button>

          <button className="control-btn" onClick={toggleFullscreen}>
            <Maximize2 size={20} />
            Fullscreen
          </button>
        </div>
      )}

      {isLive && (
        <div className="stream-info">
          <span className="info-label">Patient ID:</span>
          <span className="info-value">{patientId}</span>
          <span className="separator">•</span>
          <span className="info-label">Resolution:</span>
          <span className="info-value">1280x720</span>
        </div>
      )}
    </div>
  )
}

export default VideoStream
