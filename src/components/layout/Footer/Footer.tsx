import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { TbArrowUp, TbArrowUpRight } from 'react-icons/tb'
import { useMotionPreference } from '@/context/MotionContext'
import { navLinks } from '@/data/navigation'
import { profile } from '@/data/profile'
import { useLocalTime } from '@/hooks/useLocalTime'
import { trackPointer } from '@/lib/pointer'
import { scrollToTop } from '@/lib/scroll'
import { RollText } from '@/components/ui/RollText/RollText'
import styles from './Footer.module.scss'

export function Footer() {
  const { reduced, toggle } = useMotionPreference()
  const { time, zone } = useLocalTime(profile.timeZone, { seconds: true })
  const year = new Date().getFullYear()
  const nameLines = profile.name.split(' ')
  let letterIndex = 0

  return (
    <footer className={styles.footer}>
      <div className={styles.card} onPointerMove={trackPointer}>
        <div className={styles.brand}>
          {profile.available && (
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <Link to="/" className={styles.bigName} aria-label={`${profile.name} — home`}>
            {nameLines.map((line, li) => (
              <span className={styles.nameLine} key={li} aria-hidden="true">
                {Array.from(li === nameLines.length - 1 ? `${line}.` : line).map((char, ci) => (
                  <span key={ci} className={styles.letter} style={{ '--i': letterIndex++ } as CSSProperties}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </Link>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          <div>
            <h3 className={styles.colTitle}>Explore</h3>
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    <RollText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.colTitle}>Let&apos;s Connect</h3>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${profile.email}`} className={styles.link}>
                  <RollText text="Email" />
                </a>
              </li>
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" rel="noreferrer" className={styles.link}>
                    <RollText text={social.label} />
                    <TbArrowUpRight className={styles.external} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {profile.name}
        </span>
        <span className={styles.clock}>
          <span className={styles.clockDot} aria-hidden="true" />
          {profile.city} · {time} {zone}
        </span>
        <button type="button" role="switch" aria-checked={!reduced} className={styles.motion} onClick={toggle}>
          <span className={styles.switch} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
          Animations {reduced ? 'off' : 'on'}
        </button>
        <button type="button" className={styles.top} onClick={() => scrollToTop()}>
          <RollText text="Back to top" />
          <TbArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
