import React, { useState, useEffect } from 'react'
import { Search, User } from 'lucide-react'
import './PatientSelector.css'

const PatientSelector = ({ patients, selectedPatient, onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState(patients)

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient => 
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPatients(filtered)
    } else {
      setFilteredPatients(patients)
    }
  }, [searchTerm, patients])

  return (
    <div className="patient-selector">
      <div className="selector-group">
        <User size={20} />
        <select 
          className="patient-dropdown"
          value={selectedPatient?.id || ''}
          onChange={(e) => {
            const patient = patients.find(p => p.id === e.target.value)
            onSelectPatient(patient)
          }}
        >
          <option value="">Select Patient</option>
          {filteredPatients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} - {patient.id}
            </option>
          ))}
        </select>
      </div>

      <div className="search-group">
        <Search size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default PatientSelector
