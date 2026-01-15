import { createContext, useState } from 'react'
import { login as loginService } from '../services/authService'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  async function login(email, senha) {
    const data = await loginService(email, senha)

    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUsuario(data.usuario)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
