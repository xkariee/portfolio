import { TbArrowUpRight, TbCopy, TbMapPin } from 'react-icons/tb'
import { profile } from '@/data/profile'
import { useLocalTime } from '@/hooks/useLocalTime'
import { copyToClipboard } from '@/lib/clipboard'
import { Page } from '@/components/layout/Page/Page'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SOCIAL_ICONS } from '@/components/ui/SocialLinks/SocialLinks'
import { ContactForm } from '@/components/sections/ContactForm/ContactForm'
import styles from './Contact.module.scss'

export default function Contact() {
  const { time, zone } = useLocalTime(profile.timeZone)

  return (
    <Page title="Contact">
      <PageHeader
        eyebrow={profile.availability}
        title="Let's talk"
        uppercase
        subtitle="Have an idea, a project or just want to say hi? My inbox is always open."
      />

      <section className={styles.section} aria-label="Contact details">
        <div className="container">
          <div className={styles.grid}>
            <Reveal className={styles.info}>
              <div className={styles.block}>
                <p className={styles.label}>Email</p>
                <div className={styles.emailRow}>
                  <a href={`mailto:${profile.email}`} className={styles.email}>
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    className={styles.copy}
                    onClick={() => void copyToClipboard(profile.email, 'Email copied to clipboard')}
                    aria-label="Copy email address"
                  >
                    <TbCopy aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={styles.block}>
                <p className={styles.label}>Based in</p>
                <p className={styles.value}>
                  <TbMapPin aria-hidden="true" /> {profile.city}, {profile.location}
                </p>
                <p className={styles.time}>
                  <span className={styles.pulse} aria-hidden="true" />
                  Local time {time} {zone}
                </p>
              </div>

              <div className={styles.block}>
                <p className={styles.label}>Elsewhere</p>
                <ul className={styles.socials}>
                  {profile.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.id]
                    return (
                      <li key={social.id}>
                        <a href={social.href} target="_blank" rel="noreferrer" className={styles.social}>
                          <Icon aria-hidden="true" />
                          {social.label}
                          <TbArrowUpRight className={styles.arrow} aria-hidden="true" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  )
}
