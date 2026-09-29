import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/cn'
import { EASE_OUT } from '@/lib/motion'
import { SplitText } from '../SplitText/SplitText'
import styles from './PageHeader.module.scss'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  subtitle?: ReactNode
  uppercase?: boolean
  align?: 'center' | 'left'
  children?: ReactNode
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay } }),
}

export function PageHeader({ title, eyebrow, subtitle, uppercase = false, align = 'center', children }: PageHeaderProps) {
  const { introDone } = useApp()
  const state = introDone ? 'show' : 'hidden'

  return (
    <header className={cn(styles.header, align === 'left' && styles.left)}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        {eyebrow && (
          <motion.p className={styles.eyebrow} variants={fadeUp} custom={0.35} initial="hidden" animate={state}>
            <span className={styles.dot} aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}
        <h1 className={cn(styles.title, uppercase && styles.upper)}>
          <SplitText text={title} show={introDone} delay={0.45} />
        </h1>
        {subtitle && (
          <motion.div className={styles.subtitle} variants={fadeUp} custom={0.75} initial="hidden" animate={state}>
            {subtitle}
          </motion.div>
        )}
        {children && (
          <motion.div className={styles.extra} variants={fadeUp} custom={0.95} initial="hidden" animate={state}>
            {children}
          </motion.div>
        )}
      </div>
    </header>
  )
}
