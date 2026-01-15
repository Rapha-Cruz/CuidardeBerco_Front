import { Link } from 'react-router-dom'
import './artigoCard.css'

export default function ArtigoCard({ artigo, destaque }) {
  return (
    <Link
      to={`/artigos/${artigo.id}`}
      className={destaque ? 'artigo-card destaque' : 'artigo-card'}
    >
      <div>
        <h2>{artigo.titulo}</h2>

        <p>
          {artigo.conteudo?.slice(0, destaque ? 220 : 120)}...
        </p>

        {artigo.categoria && (
          <span className="categoria">
            {artigo.categoria}
          </span>
        )}
      </div>
    </Link>
  )
}
