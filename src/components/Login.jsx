import { useState } from 'react'
import { BoardingIllustration } from '../illustrations.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9]{10}$/

export default function Login({ onLogin, loading, serverError }) {
  const [mode, setMode] = useState('email') // 'email' | 'phone'
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const placeholder = mode === 'email' ? 'you@example.com' : '10-digit mobile number'
  const label = mode === 'email' ? 'Email address' : 'Phone number'

  const validate = () => {
    if (!value.trim()) return 'This field is required.'
    if (mode === 'email' && !EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
    if (mode === 'phone' && !PHONE_RE.test(value.trim())) return 'Enter a valid 10-digit phone number.'
    if (!password || password.length < 4) return 'Password must be at least 4 characters.'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setError('')
    onLogin(value.trim(), password)
  }

  return (
    <div className="gate-screen">
      <div className="gate-art">
        <div className="gate-art-stars" />
        <div className="gate-art-content">
          <BoardingIllustration />
          <div className="gate-art-heading">Gate opens in 10 min</div>
          <h2 className="gate-art-title">Every interview, tracked like a flight you can't miss.</h2>
          <p className="gate-art-sub">
            Company, role, and interview date — laid out like a departure
            board, so nothing slips past the gate.
          </p>
        </div>
      </div>

      <div className="gate-card-side">
        <div className="gate-card">
          <div className="gate-eyebrow">Boarding Pass</div>
          <h1 className="gate-title">Gatehouse</h1>
          <p className="gate-sub">
            Sign in to track every placement interview — company, role, and
            date — from one departure board.
          </p>

          <div className="gate-tabs" role="tablist" aria-label="Sign in method">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'email'}
              className={`gate-tab ${mode === 'email' ? 'active' : ''}`}
              onClick={() => { setMode('email'); setValue(''); setError('') }}
            >
              Email
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'phone'}
              className={`gate-tab ${mode === 'phone' ? 'active' : ''}`}
              onClick={() => { setMode('phone'); setValue(''); setError('') }}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="identity">{label}</label>
              <input
                id="identity"
                type={mode === 'email' ? 'email' : 'tel'}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete={mode === 'email' ? 'email' : 'tel'}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <div className="field-error">{error}</div>}
            {!error && serverError && <div className="field-error">{serverError}</div>}

            <button type="submit" className="gate-submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Enter dashboard'}
            </button>
          </form>

          <div className="perforation" />
          <div className="gate-foot">
            No account yet? Just enter your details above — your board is created automatically.
          </div>
        </div>
      </div>
    </div>
  )
}
