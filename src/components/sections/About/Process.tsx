import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { processSteps } from '@/data/about'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Process.module.scss'

export function Process({ index }: { index?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 85%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24 })

  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div className="container">
        <SectionHeading index={index} title="How I work" id="process-title" />
        <div ref={wrapRef} className={styles.wrap}>
          <span className={styles.rail} aria-hidden="true">
            <motion.span className={styles.railFill} style={{ scaleX: progress }} />
          </span>
          <ol className={styles.steps}>
            {processSteps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <Reveal delay={i * 0.12}>
                  <span className={styles.bullet}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.text}>{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
