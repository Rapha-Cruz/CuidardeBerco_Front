import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ArtigosAdmin() {
  const [artigos, setArtigos] = useState([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  async function carregar() {
    try {
      setLoading(true)

      const res = await fetch(`${API_URL}/artigos`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()
      setArtigos(data)
    } catch (error) {
      console.error('Erro ao carregar artigos', error)
    } finally {
      setLoading(false)
    }
  }

  async function excluir(id) {
    if (!window.confirm('Deseja realmente excluir este artigo?')) return

    try {
      await fetch(`${API_URL}/artigos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      carregar()
    } catch (error) {
      console.error('Erro ao excluir artigo', error)
    }
  }

  function formatarData(data) {
    if (!data) return '-'
    return new Date(data).toLocaleDateString('pt-BR')
  }

  useEffect(() => {
    carregar()
  }, [token])

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 20 }}>Artigos</h2>

      {/* Botão adicionar */}
      <div style={{ marginBottom: 30 }}>
        <button
          onClick={() => navigate('/admin/artigos/novo')}
          style={{
            padding: '10px 20px',
            background: '#A77ACF',
            width: 140,
            height: 38,
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          ➕ Adicionar
        </button>
      </div>

      {/* Lista */}
      {loading && <p>Carregando artigos...</p>}

      {!loading && artigos.length === 0 && (
        <p>Nenhum artigo cadastrado.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {artigos.map(a => (
          <li
            key={a.id}
            style={{
              background: '#fff',
              padding: '14px 16px',
              borderRadius: 6,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10
            }}
          >
            {/* Informações */}
            <div>
              <strong style={{ display: 'block' }}>
                {a.titulo}
              </strong>

              <small style={{ color: '#777' }}>
                Criado em: {formatarData(a.criado_em)}
              </small>
            </div>

            {/* Ações */}
            <div>
              <button
                onClick={() => navigate(`/admin/artigos/${a.id}`)}
                style={{
                  marginRight: 10,
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                ✏️ Alterar
              </button>

              <button
                onClick={() => excluir(a.id)}
                style={{
                  padding: '6px 12px',
                  color: 'red',
                  cursor: 'pointer'
                }}
              >
                🗑️ Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
