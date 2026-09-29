import { useEffect, type ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { useTransitionLabel } from '@/context/TransitionContext'
import { profile } from '@/data/profile'
import { EASE_IN_OUT, EASE_OUT } from '@/lib/motion'
import { Footer } from '../Footer/Footer'
import styles from './Page.module.scss'

interface PageProps {
  title: string
  children: ReactNode
}

const curtain: Variants = {
  pageInitial: { y: '0%' },
  pageEnter: { y: '-100%', transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.1 } },
  pageExit: { y: ['100%', '0%'], transition: { duration: 0.65, ease: EASE_IN_OUT } },
}

const label: Variants = {
  pageInitial: { opacity: 1, y: 0 },
  pageEnter: { opacity: 0, y: -60, transition: { duration: 0.6, ease: EASE_IN_OUT, delay: 0.1 } },
  pageExit: { opacity: [0, 1], y: [60, 0], transition: { duration: 0.55, ease: EASE_OUT, delay: 0.2 } },
}

const content: Variants = {
  pageInitial: { opacity: 0, y: 80 },
  pageEnter: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay: 0.35 } },
  pageExit: { opacity: 0.3, y: -60, transition: { duration: 0.65, ease: EASE_IN_OUT } },
}

export function Page({ title, children }: PageProps) {
  const nextLabel = useTransitionLabel()

  useEffect(() => {
    document.title = title === 'Home' ? `${profile.name} — ${profile.role}` : `${title} — ${profile.name}`
  }, [title])

  return (
    <motion.div initial="pageInitial" animate="pageEnter" exit="pageExit">
      <motion.div className={styles.curtain} variants={curtain} aria-hidden="true">
        <motion.span className={styles.label} variants={label}>
          <span className={styles.dot} />
          {nextLabel}
        </motion.span>
      </motion.div>
      <motion.div variants={content}>
        {children}
        <Footer />
      </motion.div>
    </motion.div>
  )
}
