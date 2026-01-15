import { useState, useEffect } from 'react'

export default function CategoriaForm({ onSubmit, categoriaSelecionada }) {
  const [nome, setNome] = useState('')

  useEffect(() => {
    if (categoriaSelecionada) {
      setNome(categoriaSelecionada.nome)
    } else {
      setNome('')
    }
  }, [categoriaSelecionada])

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(nome)
    setNome('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Nome da categoria"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        style={{ padding: 8, marginRight: 10 }}
      />

      <button type="submit">
        {categoriaSelecionada ? 'Atualizar' : 'Criar'}
      </button>
    </form>
  )
}
