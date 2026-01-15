import { apiFetch } from './api'

export async function login(email, senha) {
  return apiFetch('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  })
}
