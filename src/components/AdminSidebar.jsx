import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: '#F4EFF9',
        padding: 20
      }}
    >
      <h3 style={{ marginBottom: 20 }}>Admin</h3>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/artigos">Artigos</NavLink>
        <NavLink to="/admin/categorias">Categorias</NavLink>
      </nav>
    </aside>
  )
}
