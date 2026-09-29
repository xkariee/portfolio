import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface CounterProps {
  to: number
  suffix?: string
  start: boolean
  duration?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Counter({ to, suffix = '', start, duration = 2.4, delay = 0, className, onComplete }: CounterProps) {
  const value = useMotionValue(0)
  const display = useTransform(value, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!start) return
    const controls = animate(value, to, { duration, delay, ease: EASE_OUT_EXPO, onComplete })
    return () => controls.stop()
  }, [start, to, duration, delay, value])

  return (
    <span className={className}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className="sr-only">{`${to}${suffix}`}</span>
    </span>
  )
}
