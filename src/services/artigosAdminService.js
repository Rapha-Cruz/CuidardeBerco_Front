const API_URL = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

export async function listarArtigos() {
  const response = await fetch(`${API_URL}/artigos`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao listar artigos')
  }

  return response.json()
}

export async function buscarArtigoPorId(id) {
  const response = await fetch(`${API_URL}/artigos/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar artigo')
  }

  return response.json()
}

export async function criarArtigo(dados) {
  const response = await fetch(`${API_URL}/artigos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(dados)
  })

  if (!response.ok) {
    throw new Error('Erro ao criar artigo')
  }

  return response.json()
}

export async function atualizarArtigo(id, dados) {
  const response = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(dados)
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar artigo')
  }

  return response.json()
}

export async function excluirArtigo(id) {
  const response = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir artigo')
  }
}
