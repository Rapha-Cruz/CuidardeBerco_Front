// import { useEffect, useState } from 'react'
// import { NavLink, Link, useLocation } from 'react-router-dom'
// import { listarCategorias } from '../services/categoriasService'

// export default function Sidebar() {
//   const [categorias, setCategorias] = useState([])
//   const location = useLocation()

//   // Home ativo SOMENTE se for "/" SEM query
//   const homeAtivo =
//     location.pathname === '/' &&
//     location.search === ''

//   useEffect(() => {
//     async function carregarCategorias() {
//       try {
//         const data = await listarCategorias()
//         setCategorias(data)
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     carregarCategorias()
//   }, [])

//   return (
//     <aside className="sidebar">
//       <nav>
//         {/* HOME */}
//         <Link
//           to="/"
//           className={`menu-principal ${homeAtivo ? 'active' : ''}`}
//         >
//           Home
//         </Link>

//         {/* TÍTULO */}
//         <span className="menu-principal menu-titulo">
//           Categorias
//         </span>

//         {/* CATEGORIAS */}
//         {categorias.map(categoria => (
//           <NavLink
//             key={categoria.id}
//             to={`/?categoria=${categoria.id}`}
//             className="menu-categoria"
//           >
//             {categoria.nome}
//           </NavLink>
//         ))}

//         {/* SOBRE */}
//         <NavLink
//           to="/sobre"
//           className="menu-principal"
//           style={{ marginTop: 20 }}
//         >
//           Sobre
//         </NavLink>
//       </nav>
//     </aside>
//   )
// }
import './Sidebar.css'
import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { listarCategorias } from '../services/categoriasService'

export default function Sidebar({ aberto, onClose }) {
  const [categorias, setCategorias] = useState([])
  const location = useLocation()

  const homeAtivo =
    location.pathname === '/' &&
    location.search === ''

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarCategorias()
        setCategorias(data)
      } catch (error) {
        console.error(error)
      }
    }

    carregarCategorias()
  }, [])

  return (
    <aside className={`sidebar ${aberto ? 'aberta' : ''}`}>
      {/* Botão fechar (mobile) */}
      <button
        className="fechar-menu"
        onClick={onClose}
        aria-label="Fechar menu"
      >
        ✕
      </button>

      <nav onClick={onClose}>
        <Link
          to="/"
          className={`menu-principal ${homeAtivo ? 'active' : ''}`}
        >
          Home
        </Link>

        <span className="menu-principal menu-titulo">
          Categorias
        </span>

        {categorias.map(categoria => (
          <NavLink
            key={categoria.id}
            to={`/?categoria=${categoria.id}`}
            className="menu-categoria"
          >
            {categoria.nome}
          </NavLink>
        ))}

        <NavLink
          to="/sobre"
          className="menu-principal"
          style={{ marginTop: 20 }}
        >
          Sobre
        </NavLink>
      </nav>
    </aside>
  )
}
