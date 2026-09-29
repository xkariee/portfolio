import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useMotionPreference } from '@/context/MotionContext'
import { useFinePointer } from '@/hooks/useMediaQuery'
import styles from './Cursor.module.scss'

type Variant = 'default' | 'hover' | 'label' | 'text'

interface CursorState {
  variant: Variant
  label?: string
}

const RING = {
  default: { width: 34, height: 34, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0.45)', opacity: 1 },
  hover: { width: 58, height: 58, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.9)', opacity: 1 },
  label: { width: 92, height: 92, backgroundColor: 'rgba(255,255,255,1)', borderColor: 'rgba(255,255,255,1)', opacity: 1 },
  text: { width: 34, height: 34, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)', opacity: 0 },
}

function resolveState(target: Element | null): CursorState {
  if (!target) return { variant: 'default' }
  const labelled = target.closest<HTMLElement>('[data-cursor]')
  if (labelled?.dataset.cursor) return { variant: 'label', label: labelled.dataset.cursor }
  if (target.closest('input, textarea, [contenteditable="true"]')) return { variant: 'text' }
  if (target.closest('a, button, [role="button"], [role="option"], [role="tab"], label, select')) return { variant: 'hover' }
  return { variant: 'default' }
}

export function Cursor() {
  const finePointer = useFinePointer()
  const { reduced } = useMotionPreference()
  if (!finePointer || reduced) return null
  return <CursorInner />
}

function CursorInner() {
  const { pathname } = useLocation()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 })
  const [state, setState] = useState<CursorState>({ variant: 'default' })
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event: PointerEvent) => {
      const next = resolveState(event.target as Element | null)
      setState((prev) => (prev.variant === next.variant && prev.label === next.label ? prev : next))
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  useEffect(() => {
    setState({ variant: 'default' })
  }, [pathname])

  const { variant, label } = state

  return (
    <>
      <motion.div className={styles.ring} style={{ x: ringX, y: ringY }} animate={{ scale: pressed ? 0.85 : 1, opacity: visible ? 1 : 0 }}>
        <motion.div className={styles.ringInner} animate={RING[variant]} transition={{ type: 'spring', stiffness: 380, damping: 28 }}>
          <AnimatePresence>
            {variant === 'label' && (
              <motion.span
                key={label}
                className={styles.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.dot}
        style={{ x, y }}
        animate={{ scale: variant === 'label' || variant === 'text' ? 0 : pressed ? 0.5 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
