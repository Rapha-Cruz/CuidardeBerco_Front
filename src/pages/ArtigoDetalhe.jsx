import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import GaleriaMidias from '../components/GaleriaMidias'
import { listarArtigos, buscarArtigos } from '../services/artigosService'

export default function ArtigoDetalhe() {
  const { id } = useParams()
  const [artigo, setArtigo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarArtigos(id)
        setArtigo(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <p>Carregando artigo...</p>
      </Layout>
    )
  }

  if (!artigo) {
    return (
      <Layout>
        <p>Artigo não encontrado.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 10 }}>{artigo.titulo}</h1>

        {artigo.categoria && (
          <p style={{ color: '#777', marginBottom: 10 }}>
            Categoria: {artigo.categoria}
          </p>
        )}

        <p style={{ color: '#999', marginBottom: 20 }}>
          Publicado em{' '}
          {new Date(artigo.criado_em).toLocaleDateString('pt-BR')}
        </p>

        <p
          style={{
            fontWeight: 'bold',
            marginBottom: 20
          }}
        >
          {artigo.resumo}
        </p>

        {/* <div style={{ lineHeight: 1.6 }}>
          {artigo.conteudo}
        </div> */}
        <p className="artigo-conteudo">
          {artigo.conteudo}
        </p>


        <GaleriaMidias midias={artigo.midias} />
      </article>
    </Layout>
  )
}
