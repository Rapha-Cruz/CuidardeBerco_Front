import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function ArtigoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const API_URL = import.meta.env.VITE_API_URL

  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    categoria_id: '',
    midias: []
  })

  /* =========================
     CATEGORIAS
  ========================== */
  async function carregarCategorias() {
    const res = await fetch(`${API_URL}/categorias`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCategorias(await res.json())
  }

  /* =========================
     ARTIGO
  ========================== */
  async function carregarArtigo() {
    const res = await fetch(`${API_URL}/artigos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()

    setForm({
      titulo: data.titulo || '',
      resumo: data.resumo || '',
      conteudo: data.conteudo || '',
      categoria_id: data.categoria_id || '',
      midias: data.midias || []
    })
  }

  useEffect(() => {
    carregarCategorias()
    if (id) carregarArtigo()
  }, [id])

  /* =========================
     UPLOAD REAL
  ========================== */
  async function uploadArquivo(file, tipo) {
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('arquivo', file)

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.erro || 'Erro no upload')
      setUploading(false)
      return
    }

    setForm(prev => ({
      ...prev,
      midias: [
        ...prev.midias,
        {
          tipo,
          caminho: data.url,
          nome_original: data.nome_original,
          ordem: prev.midias.length + 1
        }
      ]
    }))

    setUploading(false)
  }

  /* =========================
     VÍDEO
  ========================== */
  function adicionarVideo() {
    setForm(prev => ({
      ...prev,
      midias: [
        ...prev.midias,
        { tipo: 'video', caminho: '', ordem: prev.midias.length + 1 }
      ]
    }))
  }

  function atualizarVideo(index, valor) {
    const novas = [...form.midias]
    novas[index].caminho = valor
    setForm({ ...form, midias: novas })
  }

  function removerMidia(index) {
    setForm({
      ...form,
      midias: form.midias.filter((_, i) => i !== index)
    })
  }

  /* =========================
     SALVAR
  ========================== */
  async function salvar(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const method = id ? 'PUT' : 'POST'
      const url = id
        ? `${API_URL}/artigos/${id}`
        : `${API_URL}/artigos`

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        throw new Error('Erro ao salvar artigo')
      }

      navigate('/admin/artigos')
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar artigo')
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     RENDER
  ========================== */
  return (
    <div style={{ maxWidth: 900 }}>
      <h2 style={{ marginBottom: 20 }}>
        {id ? 'Editar Artigo' : 'Novo Artigo'}
      </h2>

      <form
        onSubmit={salvar}
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <label>Título</label>
        <input
          value={form.titulo}
          onChange={e => setForm({ ...form, titulo: e.target.value })}
          required
          style={inputStyle}
        />

        <label>Resumo</label>
        <textarea
          value={form.resumo}
          onChange={e => setForm({ ...form, resumo: e.target.value })}
          rows={3}
          required
          style={inputStyle}
        />

        <label>Conteúdo</label>
        <textarea
          value={form.conteudo}
          onChange={e => setForm({ ...form, conteudo: e.target.value })}
          rows={6}
          required
          style={inputStyle}
        />

        <label>Categoria</label>
        <select
          value={form.categoria_id}
          onChange={e => setForm({ ...form, categoria_id: e.target.value })}
          style={inputStyle}
        >
          <option value="">Sem categoria</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <h3 style={{ marginTop: 30 }}>Mídias</h3>

        {/* BOTÕES PADRÃO */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <label style={fileButton}>
            ➕ Imagem
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => uploadArquivo(e.target.files[0], 'imagem')}
            />
          </label>

          <label style={fileButton}>
            ➕ PDF
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={e => uploadArquivo(e.target.files[0], 'pdf')}
            />
          </label>

          <button type="button" onClick={adicionarVideo}>
            ➕ Vídeo YouTube
          </button>
        </div>

        {form.midias.map((m, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 10,
              alignItems: 'center'
            }}
          >
            <strong>{m.tipo}</strong>

            {m.tipo === 'video' ? (
              <input
                placeholder="URL do YouTube"
                value={m.caminho}
                onChange={e => atualizarVideo(index, e.target.value)}
                style={{ flex: 1, padding: 8 }}
              />
            ) : (
              <a href={m.caminho} target="_blank">Arquivo enviado</a>
            )}

            <button
              type="button"
              onClick={() => removerMidia(index)}
              style={{ color: 'red' }}
            >
              🗑️
            </button>
          </div>
        ))}

        <button
          disabled={loading || uploading}
          style={{
            marginTop: 30,
            padding: '12px 24px',
            background: '#A77ACF',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          {loading || uploading ? 'Salvando...' : 'Salvar Artigo'}
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: 10,
  marginBottom: 15,
  borderRadius: 4,
  border: '1px solid #ccc'
}

const fileButton = {
  padding: '6px 12px',
  border: '1px solid #ccc',
  borderRadius: 4,
  cursor: 'pointer',
  background: '#f9f9f9'
}
