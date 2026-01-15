import { useEffect, useState } from 'react'

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([])
  const [nome, setNome] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const token = localStorage.getItem('token')

  async function carregar() {
    try {
      const res = await fetch(`${API_URL}/categorias`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setCategorias(data)
    } catch (error) {
      console.error('Erro ao carregar categorias', error)
    }
  }

  async function salvar(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editandoId
        ? `${API_URL}/${editandoId}`
        : `${API_URL}/categorias`

      const method = editandoId ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nome })
      })

      setNome('')
      setEditandoId(null)
      carregar()
    } catch (error) {
      console.error('Erro ao salvar categoria', error)
    } finally {
      setLoading(false)
    }
  }

  async function excluir(id) {
    if (!window.confirm('Deseja realmente excluir esta categoria?')) return

    try {
      await fetch(`${API_URL}/categorias/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      carregar()
    } catch (error) {
      console.error('Erro ao excluir categoria', error)
    }
  }

  function editar(categoria) {
    setNome(categoria.nome)
    setEditandoId(categoria.id)
  }

  useEffect(() => {
    carregar()
  }, [token])

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ marginBottom: 20 }}>Categorias</h2>

      {/* Formulário */}
      <form
        onSubmit={salvar}
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: 30,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end'
        }}
      >
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>
            Nome da categoria
          </label>
          <input
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Ex: Alimentação"
            required
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 4,
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#A77ACF',
            width: 120,           // 👈 largura fixa
            height: 38,           // 👈 altura fixa
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          {loading
            ? 'Salvando...'
            : editandoId
              ? '✔️Salvar'
              : '➕ Adicionar'}
        </button>
      </form>

      {/* Lista */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categorias.map(c => (
          <li
            key={c.id}
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
            <span>{c.nome}</span>

            <div>
              <button
                onClick={() => editar(c)}
                style={{
                  marginRight: 10,
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                ✏️ Alterar
              </button>

              <button
                onClick={() => excluir(c.id)}
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

      {categorias.length === 0 && (
        <p>Nenhuma categoria cadastrada.</p>
      )}
    </div>
  )
}
