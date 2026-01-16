import { useState } from 'react'
import Header from './Header'
import Sidebar from './SideBar'
import './Layout.css'

export default function Layout({ children }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="layout">
      <Header onMenuClick={() => setMenuAberto(true)} />

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
