import logo from '../assets/logo.jpg'
import './Header.css'

export default function Header({ onMenuClick }) {
  return (
    <header className="header">
      {/* Botão sanduíche */}
      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        ☰
      </button>

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
