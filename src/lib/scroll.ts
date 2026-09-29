import type Lenis from 'lenis'

let lenis: Lenis | null = null
let locks = 0

export function registerLenis(instance: Lenis | null) {
  lenis = instance
  if (lenis && locks > 0) lenis.stop()
}

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
}

export function lockScroll() {
  locks += 1
  if (locks === 1) {
    document.documentElement.classList.add('is-locked')
    lenis?.stop()
  }

  let released = false
  return () => {
    if (released) return
    released = true
    locks = Math.max(0, locks - 1)
    if (locks === 0) {
      document.documentElement.classList.remove('is-locked')
      lenis?.start()
    }
  }
}
