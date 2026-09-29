import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import styles from './RollText.module.scss'

interface RollTextProps {
  text: string
  className?: string
}

export function RollText({ text, className }: RollTextProps) {
  return (
    <span className={cn(styles.roll, className)}>
      <span className="sr-only">{text}</span>
      <span className={styles.chars} aria-hidden="true">
        {Array.from(text).map((char, i) => {
          const glyph = char === ' ' ? ' ' : char
          return (
            <span key={i} className={styles.char} data-char={glyph} style={{ '--i': i } as CSSProperties}>
              {glyph}
            </span>
          )
        })}
      </span>
    </span>
  )
}
