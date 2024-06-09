'use client'

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from 'react'

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeContextProviderProps {
  children: ReactNode
}

export default function ThemeContextProvider({
  children,
}: Readonly<ThemeContextProviderProps>) {
  const [theme, setTheme] = useState<string>('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      window.localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      window.localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')

    if (localTheme) {
      setTheme(localTheme)

      if (localTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeContextProvider')
  }

  return context
}
