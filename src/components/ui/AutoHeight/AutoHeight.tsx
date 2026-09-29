import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

export function AutoHeight({ children, className }: { children: ReactNode; className?: string }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden' }}
      initial={false}
      animate={{ height }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  )
}
