import { apiFetch } from './api'

export async function listarCategorias() {
  return apiFetch('/categorias', {
    method: 'GET'
  })
}
