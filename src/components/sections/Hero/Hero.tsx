import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react'
import { TbSend } from 'react-icons/tb'
import { useApp } from '@/context/AppContext'
import { useMotionPreference } from '@/context/MotionContext'
import { profile } from '@/data/profile'
import { useLocalTime } from '@/hooks/useLocalTime'
import { useProximityWeight } from '@/hooks/useProximityWeight'
import { EASE_OUT, EASE_OUT_EXPO } from '@/lib/motion'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Button } from '@/components/ui/Button/Button'
import { CountryFlag } from '@/components/ui/CountryFlag/CountryFlag'
import { SocialLinks } from '@/components/ui/SocialLinks/SocialLinks'
import styles from './Hero.module.scss'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
}
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}
const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}
const char: Variants = {
  hidden: { y: '115%', rotate: 8 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
}
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
}

function HeadlineLine({ text }: { text: string }) {
  return (
    <motion.span className={styles.line} variants={line} aria-hidden="true">
      {Array.from(text).map((letter, i) => (
        <motion.span key={i} className={styles.char} variants={char} data-prox>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const { introDone } = useApp()
  const { reduced } = useMotionPreference()
  const headlineRef = useRef<HTMLDivElement>(null)
  const { time, zone } = useLocalTime(profile.timeZone)

  useProximityWeight(headlineRef, { enabled: introDone && !reduced })

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowX = useSpring(useTransform(pointerX, [-1, 1], [-60, 60]), { stiffness: 50, damping: 20 })
  const glowY = useSpring(useTransform(pointerY, [-1, 1], [-36, 36]), { stiffness: 50, damping: 20 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
    pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <section className={styles.hero} onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <motion.div className={styles.glowWrap} style={{ x: glowX, y: glowY }} aria-hidden="true">
        <div className={styles.glow} />
      </motion.div>

      <motion.div className={styles.inner} initial="hidden" animate={introDone ? 'show' : 'hidden'} variants={container}>
        <motion.div className={styles.identity} variants={fadeUp}>
          <Avatar size="clamp(88px, 64px + 4vw, 128px)" />
          <div>
            <p className={styles.name}>{profile.name}.</p>
            <p className={styles.location}>
              <CountryFlag code={profile.countryCode} />
              Based in {profile.location}
            </p>
          </div>
        </motion.div>

        <h1 id="hero-title" className="sr-only">
          {profile.name} — {profile.role}
        </h1>

        <motion.div ref={headlineRef} className={styles.headline} variants={headline}>
          <HeadlineLine text={profile.headline[0]} />
          <div className={styles.row}>
            <HeadlineLine text={profile.headline[1]} />
            <motion.div className={styles.cta} variants={pop}>
              <Button to="/contact" icon={<TbSend />} magnetic>
                Contact me
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SocialLinks />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.meta}
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span>Portfolio ©{new Date().getFullYear()}</span>
        <span className={styles.scroll} aria-hidden="true">
          <span className={styles.scrollLine} />
          Scroll
        </span>
        <span>
          {profile.city} · {time} {zone}
        </span>
      </motion.div>
    </section>
  )
}
