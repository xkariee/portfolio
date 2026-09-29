import { useEffect } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useMotionPreference } from '@/context/MotionContext'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import styles from './Background.module.scss'

export function Background() {
  const finePointer = useFinePointer()
  const { reduced } = useMotionPreference()

  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const lightX = useSpring(x, { stiffness: 40, damping: 20, mass: 1 })
  const lightY = useSpring(y, { stiffness: 40, damping: 20, mass: 1 })

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const leanX = useSpring(useTransform(px, [-1, 1], [-45, 45]), { stiffness: 25, damping: 20 })
  const leanY = useSpring(useTransform(py, [-1, 1], [-30, 30]), { stiffness: 25, damping: 20 })

  const { scrollYProgress } = useScroll()
  const scroll = useSpring(scrollYProgress, { stiffness: 50, damping: 22 })
  const turn = useTransform(scroll, [0, 1], [0, 55])
  const rise = useTransform(scroll, [0, 1], [0, -140])

  const follow = finePointer && !reduced

  useEffect(() => {
    if (reduced) return
    if (follow) {
      x.jump(window.innerWidth / 2)
      y.jump(window.innerHeight / 3)
    }
    const onMove = (event: PointerEvent) => {
      if (follow) {
        x.set(event.clientX)
        y.set(event.clientY)
      }
      px.set((event.clientX / window.innerWidth) * 2 - 1)
      py.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, follow, x, y, px, py])

  return (
    <div className={styles.bg} aria-hidden="true">
      <motion.div className={styles.layer} style={reduced ? undefined : { y: rise, rotate: turn }}>
        <motion.div className={styles.layer} style={reduced ? undefined : { x: leanX, y: leanY }}>
          <div className={styles.swirl}>
            <span className={cn(styles.blob, styles.violet)} />
            <span className={cn(styles.blob, styles.pink)} />
            <span className={cn(styles.blob, styles.blue)} />
            <span className={cn(styles.blob, styles.cyan)} />
            <span className={cn(styles.blob, styles.amber)} />
          </div>
        </motion.div>
      </motion.div>
      {follow && <motion.div className={styles.follow} style={{ x: lightX, y: lightY }} />}
      <div className={styles.grid} />
      <div className={styles.noise} />
    </div>
  )
}
