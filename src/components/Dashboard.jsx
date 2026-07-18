import { useEffect, useMemo, useState } from 'react'
import InterviewForm from './InterviewForm.jsx'
import InterviewList from './InterviewList.jsx'
import {
  fetchInterviews,
  createInterview,
  updateInterview as updateInterviewRequest,
  deleteInterview as deleteInterviewRequest,
} from '../api.js'

export default function Dashboard({ identity, onLogout }) {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    fetchInterviews(identity)
      .then((data) => {
        if (!cancelled) setInterviews(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load your interviews.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [identity])

  const addInterview = async (entry) => {
    setError('')
    try {
      const created = await createInterview(identity, entry)
      setInterviews((prev) => [...prev, created])
    } catch (err) {
      setError(err.message || 'Could not add that interview.')
    }
  }

  const updateInterview = async (id, patch) => {
    setError('')
    // Optimistic update so date/status edits feel instant.
    setInterviews((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
    try {
      const updated = await updateInterviewRequest(identity, id, patch)
      setInterviews((prev) => prev.map((it) => (it.id === id ? updated : it)))
    } catch (err) {
      setError(err.message || 'Could not save that change.')
      // Re-fetch to undo the optimistic update on failure.
      fetchInterviews(identity).then(setInterviews).catch(() => {})
    }
  }

  const removeInterview = async (id) => {
    setError('')
    const previous = interviews
    setInterviews((prev) => prev.filter((it) => it.id !== id))
    try {
      await deleteInterviewRequest(identity, id)
    } catch (err) {
      setError(err.message || 'Could not remove that interview.')
      setInterviews(previous)
    }
  }

  const stats = useMemo(() => {
    const total = interviews.length
    const scheduled = interviews.filter((i) => i.status === 'Scheduled').length
    const offers = interviews.filter((i) => i.status === 'Offer').length
    const rejected = interviews.filter((i) => i.status === 'Rejected').length
    return { total, scheduled, offers, rejected }
  }, [interviews])

  return (
    <div className="board">
      <div className="board-header">
        <div className="board-brand">
          <div className="board-brand-mark">GH</div>
          <div>
            <div className="board-brand-name">Gatehouse</div>
            <div className="board-brand-title">Placement Interview Tracker</div>
          </div>
        </div>
        <div className="board-user">
          <span>{identity}</span>
          <button className="logout-btn" onClick={onLogout}>Sign out</button>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card total">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total interviews</div>
        </div>
        <div className="stat-card scheduled">
          <div className="stat-num">{stats.scheduled}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card offers">
          <div className="stat-num">{stats.offers}</div>
          <div className="stat-label">Offers</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-num">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {error && <div className="field-error" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="panel-block">
        <h2 className="panel-title">Add interview</h2>
        <InterviewForm onAdd={addInterview} />
      </div>

      <div className="panel-block">
        <h2 className="panel-title">Departure board</h2>
        {loading ? (
          <div className="empty-state">Loading your board…</div>
        ) : (
          <InterviewList
            interviews={interviews}
            onUpdate={updateInterview}
            onRemove={removeInterview}
          />
        )}
      </div>
    </div>
  )
}
