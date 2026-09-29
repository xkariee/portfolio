import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { TbSearch } from 'react-icons/tb'
import { useApp } from '@/context/AppContext'
import { navLinks } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { EASE_OUT, springSnappy } from '@/lib/motion'
import { normalizePath } from '@/lib/routes'
import { scrollToTop } from '@/lib/scroll'
import { RollText } from '@/components/ui/RollText/RollText'
import styles from './Navbar.module.scss'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent)

export function Navbar() {
  const { pathname } = useLocation()
  const { introDone, setPaletteOpen } = useApp()
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current
    lastY.current = y
    if (y < 120) setHidden(false)
    else if (delta > 8) setHidden(true)
    else if (delta < -8) setHidden(false)
  })

  useEffect(() => setHidden(false), [pathname])

  const current = normalizePath(pathname)
  const isActive = (to: string) => (to === '/' ? current === '/' : current === to || current.startsWith(`${to}/`))

  const handleClick = (to: string) => {
    if (current === to) scrollToTop()
  }

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -90, opacity: 0 }}
      animate={introDone ? { y: hidden ? -110 : 0, opacity: 1 } : { y: -90, opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: introDone && !hidden ? 0.1 : 0 }}
    >
      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.pill} onPointerLeave={() => setHovered(null)}>
          {navLinks.map((link) => {
            const active = isActive(link.to)
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(styles.link, active && styles.active)}
                  aria-current={active ? 'page' : undefined}
                  onPointerEnter={() => setHovered(link.to)}
                  onClick={() => handleClick(link.to)}
                >
                  <AnimatePresence>
                    {hovered === link.to && (
                      <motion.span
                        layoutId="nav-hover"
                        className={styles.hoverPill}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={springSnappy}
                      />
                    )}
                  </AnimatePresence>
                  {active && <motion.span layoutId="nav-active" className={styles.activeDot} transition={springSnappy} />}
                  <RollText text={link.label} />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cmd}
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
          aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
        >
          <TbSearch aria-hidden="true" />
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </button>
      </div>
    </motion.header>
  )
}
