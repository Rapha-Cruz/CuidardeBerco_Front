export default function Busca({ onBuscar }) {
  return (
    <input
      type="text"
      placeholder="Buscar por título ou descrição"
      onChange={e => onBuscar(e.target.value)}
      style={{
        width: '100%',
        padding: 10,
        marginBottom: 20,
        borderRadius: 6,
        border: '1px solid #ddd'
      }}
    />
  )
}
