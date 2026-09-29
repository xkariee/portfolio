import type { PointerEvent } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useMotionPreference } from '@/context/MotionContext'
import { TbArrowRight } from 'react-icons/tb'
import type { Project } from '@/data/projects'
import { trackPointer } from '@/lib/pointer'
import { Button } from '@/components/ui/Button/Button'
import { ProjectCover } from '@/components/ui/ProjectCover/ProjectCover'
import styles from './ProjectCard.module.scss'

const TILT = 5
const SPRING = { stiffness: 170, damping: 18, mass: 0.6 }

export function ProjectCard({ project }: { project: Project }) {
  const { reduced } = useMotionPreference()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, SPRING)
  const springY = useSpring(rotateY, SPRING)
  const href = `/projects/${project.slug}`

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    trackPointer(event)
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-py * TILT * 2)
    rotateY.set(px * TILT * 2)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      className={styles.card}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Link to={href} className={`${styles.media} cover-host`} data-cursor="View" tabIndex={-1} aria-hidden="true">
        <span className={styles.mediaInner}>
          <ProjectCover project={project} />
        </span>
        {project.inProgress ? (
          <span className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            In progress
          </span>
        ) : (
          <span className={styles.badge}>{project.year}</span>
        )}
        <span className={styles.category}>{project.category}</span>
      </Link>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{project.title}</h3>
          <Button to={href} size="sm" iconEnd={<TbArrowRight />} magnetic>
            Discover
          </Button>
        </div>
        <p className={styles.description}>{project.tagline}</p>
        <ul className={styles.tags} aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
