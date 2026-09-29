import { useEffect, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'motion/react'
import { useApp } from '@/context/AppContext'
import { stats, type Stat } from '@/data/about'
import { cn } from '@/lib/cn'
import { EASE_OUT, EASE_OUT_EXPO } from '@/lib/motion'
import { Counter } from '@/components/ui/Counter/Counter'
import styles from './Stats.module.scss'

const CURTAIN_MS = 900
const STAGGER = 0.14

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
}
const line: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
}
const number: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.7, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: EASE_OUT_EXPO } },
}
const label: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.25 } },
}

function StatItem({ stat, index, started }: { stat: Stat; index: number; started: boolean }) {
  const [done, setDone] = useState(false)

  return (
    <motion.li className={styles.item} variants={{ hidden: {}, show: {} }}>
      <motion.span className={styles.line} variants={line} aria-hidden="true">
        <span className={cn(styles.spark, done && styles.sparkDone)} />
      </motion.span>
      <motion.span className={styles.valueWrap} variants={number}>
        <Counter
          to={stat.value}
          suffix={stat.suffix}
          start={started}
          delay={0.15 + index * STAGGER}
          className={cn(styles.value, done && styles.done)}
          onComplete={() => setDone(true)}
        />
      </motion.span>
      <motion.span className={styles.label} variants={label}>
        {stat.label}
      </motion.span>
    </motion.li>
  )
}

export function Stats() {
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, { once: true, amount: 0.5 })
  const { introDone } = useApp()
  const visibleSince = useRef(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (introDone) visibleSince.current = performance.now()
  }, [introDone])

  useEffect(() => {
    if (!inView || !introDone || started) return
    const wait = Math.max(0, CURTAIN_MS - (performance.now() - visibleSince.current))
    const timer = window.setTimeout(() => setStarted(true), wait)
    return () => window.clearTimeout(timer)
  }, [inView, introDone, started])

  return (
    <section className={styles.section} aria-label="Numbers">
      <div className="container">
        <motion.ul
          ref={listRef}
          className={styles.grid}
          variants={list}
          initial="hidden"
          animate={started ? 'show' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} started={started} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
