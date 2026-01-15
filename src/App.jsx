import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ArtigoDetalhe from './pages/ArtigoDetalhe'

import LoginAdmin from './pages/LoginAdmin'
import AdminLayout from './components/AdminLayout'
import RotaPrivada from './routes/RotaPrivada'

import ArtigosAdmin from './pages/ArtigosAdmin'
import CategoriasAdmin from './pages/CategoriasAdmin'
import ArtigoForm from './pages/ArtigoForm'


import Dashboard from './pages/Dashboard'
import Sobre from './pages/Sobre'




export default function App() {
  return (
    <BrowserRouter>
  <Routes>

    {/* 🌐 PÚBLICO */}
    <Route path="/" element={<Home />} />
    <Route path="/artigos/:id" element={<ArtigoDetalhe />} />
    <Route path="/sobre" element={<Sobre />} />

    {/* 🔐 LOGIN */}
    <Route path="/admin/login" element={<LoginAdmin />} />

    {/* 🔐 ADMIN */}
    <Route
      path="/admin"
      element={
        <RotaPrivada>
          <AdminLayout />
        </RotaPrivada>
      }
    >
      {/* DASHBOARD */}
      <Route index element={<Dashboard />} />

      {/* CATEGORIAS */}
      <Route path="categorias" element={<CategoriasAdmin />} />

      {/* ARTIGOS */}
      <Route path="artigos" element={<ArtigosAdmin />} />
      <Route path="artigos/novo" element={<ArtigoForm />} />
      <Route path="artigos/:id" element={<ArtigoForm />} />
    </Route>

  </Routes>
</BrowserRouter>

  )
}
