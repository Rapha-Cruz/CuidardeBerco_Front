const API_URL = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

export async function listarCategorias() {
  const response = await fetch(`${API_URL}/categorias`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao listar categorias')
  }

  return response.json()
}

export async function criarCategoria(nome) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ nome })
  })

  if (!response.ok) {
    throw new Error('Erro ao criar categoria')
  }

  return response.json()
}

export async function atualizarCategoria(id, nome) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ nome })
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar categoria')
  }

  return response.json()
}

export async function excluirCategoria(id) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir categoria')
  }
}
