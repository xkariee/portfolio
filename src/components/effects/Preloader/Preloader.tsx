import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useApp } from '@/context/AppContext'
import { profile } from '@/data/profile'
import { lockScroll } from '@/lib/scroll'
import { EASE_IN_OUT, EASE_OUT, EASE_OUT_EXPO } from '@/lib/motion'
import styles from './Preloader.module.scss'

export function Preloader() {
  const { introDone, finishIntro } = useApp()
  const [visible, setVisible] = useState(() => !introDone)
  const progress = useMotionValue(0)
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'))
  const scaleX = useTransform(progress, [0, 100], [0, 1])

  useEffect(() => {
    if (!visible) return
    const release = lockScroll()
    let cancelled = false

    const counted = new Promise<void>((resolve) => {
      animate(progress, 100, { duration: 1.9, ease: [0.65, 0, 0.35, 1], onComplete: () => resolve() })
    })
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    let timer = 0
    void Promise.all([counted, fontsReady]).then(() => {
      if (cancelled) return
      timer = window.setTimeout(() => {
        setVisible(false)
        finishIntro()
      }, 200)
    })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      progress.stop()
      release()
    }
  }, [visible, progress, finishIntro])

  const year = new Date().getFullYear()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.preloader}
          role="status"
          aria-label="Loading"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 1, ease: EASE_IN_OUT } }}
        >
          <motion.div className={styles.center} exit={{ y: -80, opacity: 0, transition: { duration: 0.7, ease: EASE_IN_OUT } }}>
            <p className={styles.name} aria-hidden="true">
              {Array.from(profile.name).map((char, i) => (
                <span key={i} className={styles.mask}>
                  <motion.span
                    className={styles.char}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 1, ease: EASE_OUT_EXPO }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                </span>
              ))}
            </p>
            <motion.p
              className={styles.role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE_OUT }}
            >
              {profile.role} — Portfolio ©{year}
            </motion.p>
          </motion.div>

          <div className={styles.bottom}>
            <span className={styles.caption}>Loading experience</span>
            <motion.span className={styles.count}>{counter}</motion.span>
          </div>
          <motion.span className={styles.bar} style={{ scaleX }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
