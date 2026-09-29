import { Link, useParams } from 'react-router'
import { TbArrowLeft, TbArrowRight, TbBrandGithub, TbCheck, TbExternalLink } from 'react-icons/tb'
import { projects } from '@/data/projects'
import { trackPointer } from '@/lib/pointer'
import { Page } from '@/components/layout/Page/Page'
import { Button } from '@/components/ui/Button/Button'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ProjectCover } from '@/components/ui/ProjectCover/ProjectCover'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { ProjectGallery } from '@/components/sections/ProjectGallery/ProjectGallery'
import NotFound from './NotFound'
import styles from './ProjectDetail.module.scss'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.inProgress ? `${project.year} — now` : project.year },
    { label: 'Type', value: project.category },
  ]

  const story = [
    { title: 'Overview', text: project.overview },
    { title: 'The challenge', text: project.challenge },
    { title: 'The solution', text: project.solution },
  ]

  return (
    <Page title={project.title}>
      <PageHeader eyebrow={`${project.inProgress ? 'In progress' : 'Case study'} · ${project.year}`} title={project.title} subtitle={project.tagline}>
        <div className={styles.links}>
          {project.links.live && (
            <Button href={project.links.live} variant="solid" iconEnd={<TbExternalLink />} magnetic>
              Visit website
            </Button>
          )}
          {project.links.repo && (
            <Button href={project.links.repo} icon={<TbBrandGithub />} magnetic>
              Source code
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="container">
        <Link to="/projects" className={styles.back}>
          <TbArrowLeft aria-hidden="true" /> All projects
        </Link>

        <Reveal>
          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label} className={styles.metaItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className={styles.coverWrap}>
          <div className={`${styles.cover} cover-host`}>
            <ProjectCover project={project} />
          </div>
        </Reveal>

        <ul className={styles.tags} aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <section className={styles.story} aria-label="Case study">
          {story.map((block) => (
            <Reveal key={block.title} className={styles.block}>
              <h2 className={styles.blockTitle}>{block.title}</h2>
              <p className={styles.blockText}>{block.text}</p>
            </Reveal>
          ))}
        </section>

        <ProjectGallery project={project} />

        <section className={styles.highlights} aria-labelledby="highlights-title">
          <SectionHeading title="Highlights" id="highlights-title" />
          <ul className={styles.highlightList}>
            {project.highlights.map((item, i) => (
              <li key={item}>
                <Reveal delay={i * 0.06} className={styles.highlight}>
                  <TbCheck className={styles.check} aria-hidden="true" />
                  {item}
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <Link to={`/projects/${next.slug}`} className={styles.next} onPointerMove={trackPointer} data-cursor="Next">
          <span className={styles.nextLabel}>Next project</span>
          <span className={styles.nextTitle}>
            {next.title}
            <TbArrowRight className={styles.nextArrow} aria-hidden="true" />
          </span>
          <span className={styles.nextThumb} aria-hidden="true">
            <ProjectCover project={next} />
          </span>
        </Link>
      </div>
    </Page>
  )
}
