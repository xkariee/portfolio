import { useEffect, useRef, useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb'
import type { Project } from '@/data/projects'
import { EASE_OUT } from '@/lib/motion'
import { lockScroll } from '@/lib/scroll'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import styles from './ProjectGallery.module.scss'

export function ProjectGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null)
  const images = project.gallery ?? []
  if (!images.length) return null

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <SectionHeading title="Gallery" id="gallery-title" />
      <ul
        className={styles.grid}
        style={{ '--from': project.cover.from, '--to': project.cover.to } as CSSProperties}
      >
        {images.map((src, i) => (
          <li key={src}>
            <Reveal delay={(i % 3) * 0.06} className={styles.reveal}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => setOpen(i)}
                data-cursor="Zoom"
                aria-label={`Open screenshot ${i + 1} of ${images.length}`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" />
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {createPortal(
        <AnimatePresence>
          {open !== null && (
            <Lightbox images={images} index={open} title={project.title} setIndex={setOpen} onClose={() => setOpen(null)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}

interface LightboxProps {
  images: string[]
  index: number
  title: string
  setIndex: Dispatch<SetStateAction<number | null>>
  onClose: () => void
}

function Lightbox({ images, index, title, setIndex, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length

  useEffect(() => {
    const release = lockScroll()
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => {
      release()
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const go = (step: number) => setIndex((i) => (i === null ? i : (i + step + count) % count))
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          onClose()
          break
        case 'ArrowRight':
          go(1)
          break
        case 'ArrowLeft':
          go(-1)
          break
        case 'Tab': {
          const buttons = Array.from(dialogRef.current?.querySelectorAll('button') ?? [])
          if (!buttons.length) break
          event.preventDefault()
          const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
          const next = (current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length
          buttons[next].focus()
          break
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count, setIndex, onClose])

  const step = (delta: number) => setIndex((index + delta + count) % count)

  return (
    <motion.div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.img
        key={images[index]}
        className={styles.full}
        src={images[index]}
        alt={`${title} — screenshot ${index + 1} of ${count}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } }}
      />

      <button ref={closeRef} type="button" className={`${styles.control} ${styles.close}`} onClick={onClose} aria-label="Close">
        <TbX aria-hidden="true" />
      </button>

      {count > 1 && (
        <>
          <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous screenshot">
            <TbChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => step(1)} aria-label="Next screenshot">
            <TbChevronRight aria-hidden="true" />
          </button>
          <p className={styles.counter} aria-live="polite">
            {index + 1} / {count}
          </p>
        </>
      )}
    </motion.div>
  )
}
