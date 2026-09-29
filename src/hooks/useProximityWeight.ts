import { useEffect, type RefObject } from 'react'

interface ProximityOptions {
  radius?: number
  from?: number
  to?: number
  enabled?: boolean
  selector?: string
}

export function useProximityWeight(
  containerRef: RefObject<HTMLElement | null>,
  { radius = 260, from = 800, to = 200, enabled = true, selector = '[data-prox]' }: ProximityOptions = {},
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const letters = Array.from(container.querySelectorAll<HTMLElement>(selector))
    const weights = letters.map(() => from)
    let px = -1e5
    let py = -1e5
    let frame = 0

    const lockWidths = () => {
      letters.forEach((el) => {
        el.style.width = ''
        el.style.fontWeight = String(from)
      })
      const widths = letters.map((el) => parseFloat(getComputedStyle(el).width))
      letters.forEach((el, i) => {
        el.style.width = `${widths[i]}px`
        weights[i] = from
      })
    }

    const tick = () => {
      frame = 0
      const bounds = container.getBoundingClientRect()
      const far =
        px < bounds.left - radius || px > bounds.right + radius || py < bounds.top - radius || py > bounds.bottom + radius
      if (far && weights.every((w) => w === from)) return

      const rects = letters.map((el) => el.getBoundingClientRect())
      let settled = true

      letters.forEach((el, i) => {
        const r = rects[i]
        const distance = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2))
        const t = Math.max(0, 1 - distance / radius)
        const eased = t * t * (3 - 2 * t)
        const target = from + (to - from) * eased
        const next = weights[i] + (target - weights[i]) * 0.18

        weights[i] = Math.abs(target - next) < 0.5 ? target : next
        if (weights[i] !== target) settled = false
        el.style.fontWeight = String(Math.round(weights[i]))
      })

      if (!settled) frame = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      schedule()
    }
    const onLeave = () => {
      px = -1e5
      py = -1e5
      schedule()
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(lockWidths, 150)
    }

    lockWidths()
    void document.fonts?.ready.then(lockWidths)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.clearTimeout(resizeTimer)
      cancelAnimationFrame(frame)
      letters.forEach((el) => {
        el.style.fontWeight = ''
        el.style.width = ''
      })
    }
  }, [containerRef, radius, from, to, enabled, selector])
}
