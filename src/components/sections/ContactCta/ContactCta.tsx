import { useId } from 'react'
import { Link } from 'react-router'
import { TbArrowUpRight } from 'react-icons/tb'
import { profile } from '@/data/profile'
import { Magnetic } from '@/components/ui/Magnetic/Magnetic'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SplitText } from '@/components/ui/SplitText/SplitText'
import styles from './ContactCta.module.scss'

export function ContactCta({ index }: { index?: string }) {
  const pathId = `cta-ring-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const ringText = `${profile.availability} • Let's talk • `

  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <Reveal>
          <p className={styles.eyebrow}>
            {index && <span className={styles.index}>{index}</span>}
            What&apos;s next?
          </p>
        </Reveal>

        <div className={styles.layout}>
          <h2 className={styles.title} id="cta-title">
            <SplitText text="Have an idea?" by="words" />
            <br />
            <SplitText text="Let's build it." by="line" delay={0.25} pieceClassName={styles.accent} />
          </h2>

          <Reveal delay={0.3} className={styles.badgeWrap}>
            <Magnetic strength={0.35}>
              <Link to="/contact" className={styles.badge} data-cursor="Say hi">
                <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path id={pathId} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                  </defs>
                  <text>
                    <textPath href={`#${pathId}`} textLength="498" lengthAdjust="spacing">
                      {ringText.toUpperCase()}
                    </textPath>
                  </text>
                </svg>
                <span className={styles.core}>
                  <TbArrowUpRight className={styles.arrow} aria-hidden="true" />
                  <span className="sr-only">Get in touch</span>
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className={styles.text}>
            I&apos;m open to freelance projects, collaborations and full-time roles. Drop me a line at{' '}
            <a href={`mailto:${profile.email}`} className={styles.mail}>
              {profile.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
