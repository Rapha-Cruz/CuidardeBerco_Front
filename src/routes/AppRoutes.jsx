import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoute'
import ArtigoDetalhe from '../pages/ArtigoDetalhe'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/artigo/:id" element={<ArtigoDetalhe />} />    
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <h2>Área administrativa</h2>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
