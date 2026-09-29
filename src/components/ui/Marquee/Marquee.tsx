import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useMotionPreference } from '@/context/MotionContext'
import { cn } from '@/lib/cn'
import { wrap } from '@/lib/math'
import styles from './Marquee.module.scss'

interface MarqueeProps {
  items: string[]
  baseVelocity?: number
}

const COPIES = 4

export function Marquee({ items, baseVelocity = -2.2 }: MarqueeProps) {
  const { reduced } = useMotionPreference()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smoothVelocity, [-3000, 0, 3000], [7, 0, -7])
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)
  const direction = useRef(1)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return
    const dt = Math.min(delta, 64) / 1000
    let moveBy = direction.current * baseVelocity * dt
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={ref} className={styles.marquee} aria-hidden="true">
      <motion.div className={styles.track} style={{ x, skewX }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div className={styles.group} key={copy}>
            {items.map((item, i) => (
              <span className={styles.item} key={i}>
                <span className={cn(styles.text, i % 2 === 1 && styles.outline)}>{item}</span>
                <svg className={styles.star} viewBox="0 0 24 24">
                  <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
