import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { MotionConfig } from 'motion/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  applyMotionAttribute,
  readMotionPref,
  REDUCED_QUERY,
  writeMotionPref,
  type MotionPref,
} from '@/lib/motionPreference'
import { toast } from '@/lib/toast'

interface MotionContextValue {
  reduced: boolean
  toggle: () => void
}

const MotionPreferenceContext = createContext<MotionContextValue | null>(null)
const NOTICE_KEY = 'portfolio:motion-notice'

export function MotionProvider({ children }: { children: ReactNode }) {
  const [pref, setPref] = useState<MotionPref>(readMotionPref)
  const systemReduced = useMediaQuery(REDUCED_QUERY)
  const reduced = pref === 'system' ? systemReduced : pref === 'reduced'
  const fromSystem = pref === 'system' && systemReduced

  useLayoutEffect(() => applyMotionAttribute(reduced), [reduced])

  const toggle = useCallback(() => {
    const next: MotionPref = reduced ? 'full' : 'reduced'
    writeMotionPref(next)
    setPref(next)
    toast(next === 'full' ? 'Animations enabled' : 'Animations reduced', 'success')
  }, [reduced])

  useEffect(() => {
    if (!fromSystem) return
    try {
      if (sessionStorage.getItem(NOTICE_KEY)) return
    } catch {
      return
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(NOTICE_KEY, '1')
      } catch {
      }
      toast('Animations are reduced by your system settings.', 'default', {
        duration: 8000,
        action: { label: 'Enable', onClick: toggle },
      })
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [fromSystem, toggle])

  const value = useMemo(() => ({ reduced, toggle }), [reduced, toggle])

  return (
    <MotionPreferenceContext value={value}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionPreferenceContext>
  )
}

export function useMotionPreference() {
  const ctx = useContext(MotionPreferenceContext)
  if (!ctx) throw new Error('useMotionPreference must be used inside <MotionProvider>')
  return ctx
}
