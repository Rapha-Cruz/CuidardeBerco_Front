export default function GaleriaMidias({ midias = [] }) {
  if (midias.length === 0) return null

  return (
    <div style={{ marginTop: 30 }}>
      {midias.map((m, index) => {
        if (m.tipo === 'imagem') {
          return (
            <img
              key={index}
              src={m.caminho}
              alt=""
              style={{
                maxWidth: '100%',
                borderRadius: 8,
                marginBottom: 16
              }}
            />
          )
        }

        if (m.tipo === 'pdf') {
          return (
            <p key={index}>
              📄{' '}
              <a href={m.caminho} target="_blank" rel="noreferrer">
                {m.nome_original || 'Abrir PDF'}
              </a>
            </p>
          )
        }

        if (m.tipo === 'video') {
          const videoId = m.caminho.split('v=')[1]?.split('&')[0]

          return (
            <iframe
              key={index}
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Vídeo"
              frameBorder="0"
              allowFullScreen
              style={{ marginBottom: 20 }}
            />
          )
        }

        return null
      })}
    </div>
  )
}
