import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'
import { TOKEN_KEY } from '../api/client'

const USER_KEY = 'ephemeral_user'

interface AuthState {
  user: User | null
  token: string | null
}

interface AuthContextValue extends AuthState {
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadPersistedAuth(): AuthState {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const raw = localStorage.getItem(USER_KEY)
    const user = raw ? (JSON.parse(raw) as User) : null
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadPersistedAuth)

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setAuth({ token, user })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setAuth({ token: null, user: null })
  }, [])

  const updateUser = useCallback((user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setAuth((prev) => ({ ...prev, user }))
  }, [])

  return (
    <AuthContext.Provider
      value={{ ...auth, login, logout, updateUser, isAuthenticated: !!auth.token }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
