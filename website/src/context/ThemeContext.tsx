import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

const STORAGE_KEY = 'ephemeral_dark'

interface ThemeContextValue {
  isDark: boolean
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === 'true'
    // Set immediately to avoid a flash of wrong theme on load
    document.documentElement.setAttribute('data-dark', String(stored))
    return stored
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', String(isDark))
    localStorage.setItem(STORAGE_KEY, String(isDark))
  }, [isDark])

  const toggleDark = useCallback(() => setIsDark((d) => !d), [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
