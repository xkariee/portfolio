import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import { cn } from '@/lib/cn'
import { springSnappy } from '@/lib/motion'
import { Page } from '@/components/layout/Page/Page'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ProjectGrid } from '@/components/sections/Projects/ProjectGrid'
import styles from './Projects.module.scss'

type Filter = 'All' | ProjectCategory

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const filters = useMemo(
    () =>
      (['All', ...projectCategories] as Filter[]).map((f) => ({
        id: f,
        count: f === 'All' ? projects.length : projects.filter((p) => p.category === f).length,
      })),
    [],
  )

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const years = projects.map((p) => Number(p.year))

  return (
    <Page title="Projects">
      <PageHeader
        eyebrow={`${projects.length} projects · ${Math.min(...years)} — ${Math.max(...years)}`}
        title="Projects"
        uppercase
        subtitle="Explore a selection of projects showcasing different skills and technologies."
      />

      <section className={styles.section} aria-label="Project list">
        <div className="container">
          <div className={styles.toolbar} role="group" aria-label="Filter projects">
            {filters.map(({ id, count }) => {
              const active = filter === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  className={cn(styles.filter, active && styles.active)}
                  onClick={() => setFilter(id)}
                  disabled={count === 0}
                >
                  {active && <motion.span layoutId="projects-filter" className={styles.pill} transition={springSnappy} />}
                  {id}
                  <sup className={styles.count}>{count}</sup>
                </button>
              )
            })}
          </div>

          <ProjectGrid projects={visible} />
        </div>
      </section>
    </Page>
  )
}
