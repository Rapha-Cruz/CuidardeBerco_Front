import { useEffect, useState } from 'react'
import './Dashboard.css'

export default function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL
  const [dados, setDados] = useState({
    categorias: 0,
    artigos: 0
  })

  useEffect(() => {
    async function carregar() {
      try {
        const [catRes, artRes] = await Promise.all([
          fetch(`${API_URL}/categorias`),
          fetch(`${API_URL}/artigos`)
        ])

        const categorias = await catRes.json()
        const artigos = await artRes.json()

        setDados({
          categorias: Array.isArray(categorias) ? categorias.length : 0,
          artigos: Array.isArray(artigos) ? artigos.length : 0
        })
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
      }
    }

    carregar()
  }, [])

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Categorias</h3>
        <p>{dados.categorias}</p>
      </div>

      <div className="card">
        <h3>Artigos</h3>
        <p>{dados.artigos}</p>
      </div>
    </div>
  )
}
