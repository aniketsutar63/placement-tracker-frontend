import { useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import { login as loginRequest } from './api.js'

const SESSION_KEY = 'gatehouse_session'

export default function App() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY)
    if (saved) setSession(JSON.parse(saved))
  }, [])

  const handleLogin = async (identity, password) => {
    setAuthError('')
    setAuthLoading(true)
    try {
      const result = await loginRequest(identity, password)
      const record = { identity: result.identity, loggedInAt: new Date().toISOString() }
      localStorage.setItem(SESSION_KEY, JSON.stringify(record))
      setSession(record)
    } catch (err) {
      setAuthError(err.message || 'Unable to sign in. Please try again.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  if (!session) {
    return (
      <Login onLogin={handleLogin} loading={authLoading} serverError={authError} />
    )
  }

  return <Dashboard identity={session.identity} onLogout={handleLogout} />
}
