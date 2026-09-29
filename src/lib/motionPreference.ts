export type MotionPref = 'system' | 'full' | 'reduced'

const KEY = 'portfolio:motion'
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

export function readMotionPref(): MotionPref {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'full' || value === 'reduced' ? value : 'system'
  } catch {
    return 'system'
  }
}

export function writeMotionPref(pref: MotionPref) {
  try {
    if (pref === 'system') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, pref)
  } catch {
  }
}

export function resolveReducedMotion(pref: MotionPref) {
  return pref === 'system' ? window.matchMedia(REDUCED_QUERY).matches : pref === 'reduced'
}

export function applyMotionAttribute(reduced: boolean) {
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
}
