const STATUSES = ['Applied', 'Scheduled', 'Offer', 'Rejected']

import { EmptyBoardIllustration } from '../illustrations.jsx'

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function InterviewList({ interviews, onUpdate, onRemove }) {
  if (interviews.length === 0) {
    return (
      <div className="empty-state">
        <EmptyBoardIllustration />
        <strong>Board is empty</strong>
        Add your first interview above — company, role, and date — to start tracking it here.
      </div>
    )
  }

  const sorted = [...interviews].sort((a, b) => (a.date > b.date ? 1 : -1))

  return (
    <table className="flap-table">
      <thead>
        <tr>
          <th>Company / Role</th>
          <th>Interview date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((item) => (
          <tr className="flap-row" key={item.id}>
            <td data-label="Company / Role" className="company-cell">
              {item.company}
              <span className="role-sub">{item.role}</span>
            </td>
            <td data-label="Interview date" className="flap-cell">
              <input
                type="date"
                value={item.date}
                onChange={(e) => onUpdate(item.id, { date: e.target.value })}
                className="status-select"
                aria-label={`Interview date for ${item.company}`}
              />
              <span className="visually-hidden">{formatDate(item.date)}</span>
            </td>
            <td data-label="Status">
              <select
                className={`status-select status-${item.status}`}
                value={item.status}
                onChange={(e) => onUpdate(item.id, { status: e.target.value })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
            <td data-label="">
              <button className="remove-btn" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
