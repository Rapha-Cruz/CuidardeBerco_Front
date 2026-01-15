const API_URL = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

export async function uploadArquivo(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  })

  if (!response.ok) {
    throw new Error('Erro ao fazer upload')
  }

  return response.json() // { url, tipo }
}
