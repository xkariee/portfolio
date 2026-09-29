import { Fragment } from 'react'
import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO } from '@/lib/motion'
import styles from './SplitText.module.scss'

interface SplitTextProps {
  text: string
  by?: 'chars' | 'words' | 'line'
  className?: string
  pieceClassName?: string
  delay?: number
  stagger?: number
  duration?: number
  show?: boolean
}

export function SplitText({
  text,
  by = 'chars',
  className,
  pieceClassName,
  delay = 0,
  stagger,
  duration = 1,
  show,
}: SplitTextProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger ?? (by === 'chars' ? 0.028 : 0.07), delayChildren: delay } },
  }
  const piece: Variants = {
    hidden: { y: '115%' },
    show: { y: '0%', transition: { duration, ease: EASE_OUT_EXPO } },
  }

  const trigger =
    show === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.5 } }
      : { animate: show ? 'show' : 'hidden' }

  const renderPiece = (content: string, key?: number) => (
    <motion.span key={key} className={cn(styles.piece, pieceClassName)} variants={piece}>
      {content}
    </motion.span>
  )

  const words = text.split(' ')

  return (
    <motion.span className={cn(styles.split, className)} initial="hidden" variants={container} {...trigger}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {by === 'line' ? (
          <span className={styles.word}>{renderPiece(text)}</span>
        ) : (
          words.map((word, wi) => (
            <Fragment key={wi}>
              <span className={styles.word}>
                {by === 'chars' ? Array.from(word).map((char, ci) => renderPiece(char, ci)) : renderPiece(word)}
              </span>
              {wi < words.length - 1 && ' '}
            </Fragment>
          ))
        )}
      </span>
    </motion.span>
  )
}
