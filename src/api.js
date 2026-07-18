const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // response had no JSON body
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  return res.json()
}

export function login(identity, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identity, password }),
  })
}

export function fetchInterviews(identity) {
  return request(`/api/interviews?identity=${encodeURIComponent(identity)}`)
}

export function createInterview(identity, entry) {
  return request(`/api/interviews?identity=${encodeURIComponent(identity)}`, {
    method: 'POST',
    body: JSON.stringify(entry),
  })
}

export function updateInterview(identity, id, patch) {
  return request(`/api/interviews/${id}?identity=${encodeURIComponent(identity)}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  })
}

export function deleteInterview(identity, id) {
  return request(`/api/interviews/${id}?identity=${encodeURIComponent(identity)}`, {
    method: 'DELETE',
  })
}
