import { useState } from 'react'

const STATUSES = ['Applied', 'Scheduled', 'Offer', 'Rejected']

export default function InterviewForm({ onAdd }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('Applied')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!company.trim() || !role.trim() || !date) {
      setError('Company, role, and interview date are required.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await onAdd({
        company: company.trim(),
        role: role.trim(),
        date,
        status,
      })
      setCompany('')
      setRole('')
      setDate('')
      setStatus('Applied')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            placeholder="e.g. Northwind Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            placeholder="e.g. SDE Intern"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="date">Interview date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="add-btn" disabled={submitting}>
          {submitting ? 'Adding…' : '+ Add interview'}
        </button>
      </div>
      <div className="field" style={{ marginTop: 14, maxWidth: 220 }}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          className="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {error && <div className="field-error">{error}</div>}
    </form>
  )
}
