import { profile } from '@/data/profile'
import { Page } from '@/components/layout/Page/Page'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText/ScrollRevealText'
import { SocialLinks } from '@/components/ui/SocialLinks/SocialLinks'
import { ContactCta } from '@/components/sections/ContactCta/ContactCta'
import { Experience } from '@/components/sections/Experience/Experience'
import { Process } from '@/components/sections/About/Process'
import { Services } from '@/components/sections/About/Services'
import { Stats } from '@/components/sections/About/Stats'
import { TechStack } from '@/components/sections/TechStack/TechStack'
import styles from './About.module.scss'

export default function About() {
  return (
    <Page title="About">
      <PageHeader eyebrow="About me" title={`Hi, I'm ${profile.name}.`} subtitle={profile.intro}>
        <div className={styles.headerExtra}>
          <Avatar size="clamp(76px, 60px + 3vw, 104px)" />
          <SocialLinks />
        </div>
      </PageHeader>

      <Stats />

      <section className={styles.manifesto} aria-label="Manifesto">
        <div className="container">
          <p className={styles.kicker}>( Manifesto )</p>
          <ScrollRevealText text={profile.manifesto} />
        </div>
      </section>

      <Services index="01" />
      <TechStack index="02" />
      <Experience index="03" />
      <Process index="04" />
      <ContactCta index="05" />
    </Page>
  )
}
