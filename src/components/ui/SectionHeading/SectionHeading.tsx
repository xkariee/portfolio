import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import { EASE_OUT, EASE_OUT_EXPO } from '@/lib/motion'
import styles from './SectionHeading.module.scss'

interface SectionHeadingProps {
  title: string
  index?: string
  id?: string
  action?: ReactNode
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fade: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}
const slide: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
}
const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.15 } },
}

export function SectionHeading({ title, index, id, action }: SectionHeadingProps) {
  return (
    <motion.div
      className={styles.heading}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      variants={container}
    >
      <h2 className={styles.title} id={id}>
        {index && (
          <motion.span className={styles.index} variants={fade} aria-hidden="true">
            {index}
          </motion.span>
        )}
        <span className={styles.mask}>
          <motion.span className={styles.text} variants={slide}>
            {title}
          </motion.span>
        </span>
      </h2>
      <motion.span className={styles.rule} variants={draw} aria-hidden="true" />
      {action && (
        <motion.div className={styles.action} variants={fade}>
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
