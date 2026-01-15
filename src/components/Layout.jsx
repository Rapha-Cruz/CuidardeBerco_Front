import Header from './Header'
import Sidebar from './SideBar'
import './layout.css'

export default function Layout({ children }) {
  return (    
    <div className="layout">
      <Header />
      <div className="content">
        <Sidebar />        
        <main className="conteudo">
          {children}
        </main>
      </div>
      
    </div>
  )
}


