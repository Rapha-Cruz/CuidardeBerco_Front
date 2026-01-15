import logo from '../assets/logo.jpg'
import './header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="logo-area">
        <img
          src={logo}
          alt="Logo Cuidar de Berço"
        />

        <span className="logo-texto">
          CUIDAR DE BERÇO
        </span>
      </div>
    </header>
  )
}
