import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, type Variants } from 'motion/react'
import { studies, work, type TimelineItem } from '@/data/experience'
import { cn } from '@/lib/cn'
import { EASE_OUT, springSnappy } from '@/lib/motion'
import { trackPointer } from '@/lib/pointer'
import { AutoHeight } from '@/components/ui/AutoHeight/AutoHeight'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Experience.module.scss'

const TABS = [
  { id: 'work', label: 'Work', items: work },
  { id: 'studies', label: 'Studies', items: studies },
] as const

type TabId = (typeof TABS)[number]['id']

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const entry: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  return (
    <motion.li className={styles.item} variants={entry}>
      <span
        className={cn(styles.logo, item.current && styles.current)}
        style={{ '--accent': item.accent } as CSSProperties}
        aria-hidden="true"
      >
        {item.logo ? <img src={item.logo} alt="" /> : item.initials}
      </span>
      <div className={styles.content}>
        <p className={styles.period}>
          {item.period}
          {item.current && <span className={styles.now}>Now</span>}
        </p>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.subtitle}>{item.subtitle}</p>
        {item.description && <p className={styles.description}>{item.description}</p>}
        {item.tags && (
          <ul className={styles.tags}>
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
}

export function Experience({ index = '01' }: { index?: string }) {
  const [tab, setTab] = useState<TabId>('work')
  const cardRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({})

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  const items = TABS.find((t) => t.id === tab)?.items ?? []

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TABS.findIndex((t) => t.id === tab)
    let next = current
    if (event.key === 'ArrowRight') next = (current + 1) % TABS.length
    else if (event.key === 'ArrowLeft') next = (current - 1 + TABS.length) % TABS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = TABS.length - 1
    else return
    event.preventDefault()
    const nextId = TABS[next].id
    setTab(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <section className={styles.section} aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading index={index} title="Experience" id="experience-title" />

        <div className={styles.tabs} role="tablist" aria-label="Experience type" onKeyDown={onTabKeyDown}>
          {TABS.map((t) => {
            const selected = t.id === tab
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el
                }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls="experience-panel"
                tabIndex={selected ? 0 : -1}
                className={cn(styles.tab, selected && styles.tabActive)}
                onClick={() => setTab(t.id)}
              >
                {selected && <motion.span layoutId="experience-tab" className={styles.tabPill} transition={springSnappy} />}
                <span className={styles.tabLabel}>{t.label}</span>
                <span className={styles.tabCount}>{String(t.items.length).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>

        <div
          ref={cardRef}
          className={styles.card}
          onPointerMove={trackPointer}
          role="tabpanel"
          id="experience-panel"
          aria-labelledby={`tab-${tab}`}
        >
          <div className={styles.track} aria-hidden="true">
            <motion.span className={styles.trackFill} style={{ scaleY: progress }} />
          </div>
          <AutoHeight>
            <AnimatePresence mode="wait">
              <motion.ol
                key={tab}
                className={styles.list}
                variants={list}
                initial="hidden"
                whileInView="show"
                exit="exit"
                viewport={{ once: true, amount: 0.15 }}
              >
                {items.map((item) => (
                  <TimelineEntry key={item.id} item={item} />
                ))}
              </motion.ol>
            </AnimatePresence>
          </AutoHeight>
        </div>
      </div>
    </section>
  )
}
