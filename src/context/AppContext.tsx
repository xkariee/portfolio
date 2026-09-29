import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { readMotionPref, resolveReducedMotion } from '@/lib/motionPreference'

interface AppContextValue {
  introDone: boolean
  finishIntro: () => void
  paletteOpen: boolean
  setPaletteOpen: (open: boolean) => void
  togglePalette: () => void
}

const AppContext = createContext<AppContextValue | null>(null)
const INTRO_KEY = 'portfolio:intro-played'

function shouldSkipIntro() {
  if (resolveReducedMotion(readMotionPref())) return true
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(shouldSkipIntro)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const finishIntro = useCallback(() => {
    setIntroDone(true)
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
    }
  }, [])

  const togglePalette = useCallback(() => setPaletteOpen((open) => !open), [])

  const value = useMemo(
    () => ({ introDone, finishIntro, paletteOpen, setPaletteOpen, togglePalette }),
    [introDone, finishIntro, paletteOpen, togglePalette],
  )

  return <AppContext value={value}>{children}</AppContext>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
