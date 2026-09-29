import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { motion, type Variants } from 'motion/react'
import { stack, stackCategories, type StackCategory } from '@/data/stack'
import { cn } from '@/lib/cn'
import { EASE_OUT, springSnappy } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import styles from './TechStack.module.scss'

type Filter = 'All' | StackCategory

const FILTERS: Filter[] = ['All', ...stackCategories]

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}
const chip: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
}

export function TechStack({ index = '02' }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>('All')
  const gridRef = useRef<HTMLUListElement>(null)

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    gridRef.current?.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      el.style.setProperty('--my', `${event.clientY - rect.top}px`)
    })
  }

  return (
    <section className={styles.section} aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading index={index} title="Tech Stack" id="stack-title" />

        <div className={styles.filters} role="group" aria-label="Filter technologies">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                className={cn(styles.filter, active && styles.filterActive)}
                onClick={() => setFilter(f)}
              >
                {active && <motion.span layoutId="stack-filter" className={styles.filterPill} transition={springSnappy} />}
                {f}
              </button>
            )
          })}
        </div>

        <motion.ul
          ref={gridRef}
          className={styles.grid}
          onPointerMove={onPointerMove}
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stack.map((tech) => {
            const dimmed = filter !== 'All' && tech.category !== filter
            const Icon = tech.icon
            return (
              <motion.li key={tech.name} variants={chip}>
                <span
                  className={cn(styles.chip, dimmed && styles.dimmed, filter !== 'All' && !dimmed && styles.lit)}
                  style={{ '--brand': tech.color } as CSSProperties}
                  data-glow
                >
                  <Icon className={styles.icon} aria-hidden="true" />
                  {tech.name}
                  {tech.learning && <span className={styles.learning}>learning</span>}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
