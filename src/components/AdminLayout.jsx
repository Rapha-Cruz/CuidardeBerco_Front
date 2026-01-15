import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './AdminLayout.css'

export default function AdminLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="admin-container">
      {/* MENU LATERAL */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Cuidar de Berço</h2>

        <nav className="admin-menu">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>

          <NavLink to="/admin/artigos">
            Artigos
          </NavLink>

          <NavLink to="/admin/categorias">
            Categorias
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="admin-content">
        <header className="admin-header">
          <h1>Painel Administrativo</h1>
        </header>

        <section className="admin-page">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
