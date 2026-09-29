import { Link } from 'react-router'
import { TbArrowUpRight } from 'react-icons/tb'
import { marqueeItems } from '@/data/about'
import { projects } from '@/data/projects'
import { Page } from '@/components/layout/Page/Page'
import { Marquee } from '@/components/ui/Marquee/Marquee'
import { RollText } from '@/components/ui/RollText/RollText'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import { ContactCta } from '@/components/sections/ContactCta/ContactCta'
import { Experience } from '@/components/sections/Experience/Experience'
import { Hero } from '@/components/sections/Hero/Hero'
import { ProjectGrid } from '@/components/sections/Projects/ProjectGrid'
import { TechStack } from '@/components/sections/TechStack/TechStack'
import styles from './Home.module.scss'

const featured = projects.filter((project) => project.featured).slice(0, 2)

export default function Home() {
  return (
    <Page title="Home">
      <Hero />
      <Marquee items={marqueeItems} />
      <Experience index="01" />
      <TechStack index="02" />

      <section className={styles.projects} aria-labelledby="featured-title">
        <div className="container">
          <SectionHeading
            index="03"
            title="Projects"
            id="featured-title"
            action={
              <Link to="/projects" className={styles.more}>
                <RollText text="View more" />
                <TbArrowUpRight aria-hidden="true" />
              </Link>
            }
          />
          <ProjectGrid projects={featured} />
        </div>
      </section>

      <ContactCta index="04" />
    </Page>
  )
}
