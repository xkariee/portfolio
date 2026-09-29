import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useMotionPreference } from '@/context/MotionContext'
import { registerLenis } from '@/lib/scroll'

export function SmoothScroll() {
  const { reduced } = useMotionPreference()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true })
    registerLenis(lenis)

    return () => {
      registerLenis(null)
      lenis.destroy()
    }
  }, [reduced])

  return null
}
