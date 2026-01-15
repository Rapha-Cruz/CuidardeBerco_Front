const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.erro || 'Erro na requisição')
  }

  return response.json()
}
