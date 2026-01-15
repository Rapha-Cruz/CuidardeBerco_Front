import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { listarArtigos } from '../services/artigosService'
import ArtigoCard from '../components/ArtigoCard'
import Busca from '../components/Busca'
import './home.css'

export default function Home() {
  const [artigos, setArtigos] = useState([])
  const [artigosFiltrados, setArtigosFiltrados] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const categoriaId = searchParams.get('categoria')

  // 🔹 Carrega artigos (API)
  useEffect(() => {
    async function carregarArtigos() {
      try {
        setLoading(true)

        const data = await listarArtigos({ categoriaId })
        setArtigos(data)
        setArtigosFiltrados(data) // começa mostrando tudo
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarArtigos()
  }, [categoriaId])

  // 🔍 Busca local (frontend)
  function filtrarArtigos(texto) {
    const termo = texto.toLowerCase()

    if (!termo) {
      setArtigosFiltrados(artigos)
      return
    }

    const filtrados = artigos.filter(a =>
      a.titulo.toLowerCase().includes(termo) ||
      a.resumo?.toLowerCase().includes(termo) ||
      a.conteudo?.toLowerCase().includes(termo)
    )

    setArtigosFiltrados(filtrados)
  }

  return (
    <Layout>
      <Busca onBuscar={filtrarArtigos} />

      {loading && <p>Carregando artigos...</p>}

      {!loading && artigosFiltrados.length === 0 && (
        <p>Nenhum artigo encontrado.</p>
      )}

      {!loading && artigosFiltrados.length > 0 && (
        <>
          {/* Destaque */}
          <ArtigoCard artigo={artigosFiltrados[0]} destaque />

          {/* Grid */}
          <div className="artigos-grid">
            {artigosFiltrados.slice(1).map(artigo => (
              <ArtigoCard key={artigo.id} artigo={artigo} />
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
