// import Header from './Header'
// import Sidebar from './SideBar'
// import './Layout.css'

// export default function Layout({ children }) {
//   return (    
//     <div className="layout">
//       <Header />
//       <div className="content">
//         <Sidebar />        
//         <main className="conteudo">
//           {children}
//         </main>
//       </div>
      
//     </div>
//   )
// }


import { useState } from 'react'
import Header from './Header'
import Sidebar from './SideBar'
import './Layout.css'

export default function Layout({ children }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="layout">
      {/* Botão sanduíche */}
      <button
        className="menu-toggle"
        onClick={() => setMenuAberto(true)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <Header />

      <div className="content">
        <Sidebar
          aberto={menuAberto}
          onClose={() => setMenuAberto(false)}
        />

        <main
          className="conteudo"
          onClick={() => menuAberto && setMenuAberto(false)}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
