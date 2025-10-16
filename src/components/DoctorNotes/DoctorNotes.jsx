import React, { useState } from 'react'
import { FileText, Save, Edit2 } from 'lucide-react'
import './DoctorNotes.css'

const DoctorNotes = ({ notes, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedNotes, setEditedNotes] = useState(notes || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await onSave(editedNotes)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setEditedNotes(notes || '')
    setIsEditing(false)
  }

  return (
    <div className="doctor-notes">
      <div className="notes-header">
        <FileText size={24} />
        <h2>Doctor's Notes</h2>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="notes-editor">
          <textarea
            className="notes-textarea"
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Enter clinical observations, recommendations, and treatment plan modifications..."
            rows={10}
          />
          <div className="editor-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave} disabled={isSaving}>
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>
      ) : (
        <div className="notes-display">
          {notes ? (
            <pre className="notes-content">{notes}</pre>
          ) : (
            <p className="notes-empty">No notes available. Click "Edit" to add clinical observations.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default DoctorNotes
