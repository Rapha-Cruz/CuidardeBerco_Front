import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginAdmin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao fazer login')
      }

      // Salva token
      localStorage.setItem('token', data.access_token)

      // Redireciona
      navigate('/admin')
    } catch (error) {
      setErro(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F4EFF9'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 320,
          padding: 30,
          background: '#fff',
          borderRadius: 8
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Login Admin</h2>

        {erro && (
          <p style={{ color: 'red', marginBottom: 10 }}>
            {erro}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 20, padding: 8 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            background: '#A77ACF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
