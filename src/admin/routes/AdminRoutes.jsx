import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import LoginAdmin from '../../pages/LoginAdmin'
import Dashboard from '../../pages/Dashboard'
import ArtigosAdmin from '../../pages/ArtigosAdmin'
import ArtigoForm from '../../pages/ArtigoForm'
import CategoriasAdmin from '../../pages/CategoriasAdmin'
import RotaPrivada from '../../routes/RotaPrivada'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route
        path="/admin"
        element={
          <RotaPrivada>
            <AdminLayout />
          </RotaPrivada>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="artigos" element={<ArtigosAdmin />} />
        <Route path="artigos/novo" element={<ArtigoForm />} />
        <Route path="artigos/:id" element={<ArtigoForm />} />
        <Route path="categorias" element={<CategoriasAdmin />} />
      </Route>
    </Routes>
  )
}
