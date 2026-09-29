import { AnimatePresence, motion } from 'motion/react'
import type { Project } from '@/data/projects'
import { EASE_OUT } from '@/lib/motion'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectGrid.module.scss'

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.grid}>
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project, i) => (
          <motion.li
            key={project.slug}
            layout
            className={styles.item}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Reveal delay={(i % 2) * 0.12} className={styles.reveal}>
              <ProjectCard project={project} />
            </Reveal>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
