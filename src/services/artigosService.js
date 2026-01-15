const API_URL = import.meta.env.VITE_API_URL

export async function listarArtigos({ categoriaId, busca } = {}) {
  let url = `${API_URL}/artigos`

  if (busca) {
    url = `${API_URL}/artigos/pesquisa?q=${encodeURIComponent(busca)}`
  } else if (categoriaId) {
    url = `${API_URL}/artigos/categorias/${categoriaId}`
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Erro ao listar artigos')
  }

  return res.json()
}

export async function buscarArtigos(id) {
  const res = await fetch(`${API_URL}/artigos/${id}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar artigo')
  }

  return res.json()
}
