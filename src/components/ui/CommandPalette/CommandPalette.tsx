import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import type { IconType } from 'react-icons'
import {
  TbArrowUp,
  TbArrowUpRight,
  TbCode,
  TbCopy,
  TbCornerDownLeft,
  TbFolder,
  TbHome,
  TbMail,
  TbMessage,
  TbSearch,
  TbSparkles,
  TbUser,
} from 'react-icons/tb'
import { useApp } from '@/context/AppContext'
import { useMotionPreference } from '@/context/MotionContext'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { copyToClipboard } from '@/lib/clipboard'
import { lockScroll, scrollToTop } from '@/lib/scroll'
import { EASE_OUT, springSnappy } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { SOCIAL_ICONS } from '../SocialLinks/SocialLinks'
import styles from './CommandPalette.module.scss'

type Group = 'Navigate' | 'Projects' | 'Links' | 'Actions'

interface Command {
  id: string
  label: string
  group: Group
  icon: IconType
  keywords?: string
  hint?: string
  run: () => void
}

const GROUP_ORDER: Group[] = ['Navigate', 'Projects', 'Links', 'Actions']

function score(command: Command, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return 1
  const label = command.label.toLowerCase()
  const haystack = `${label} ${command.keywords ?? ''} ${command.group}`.toLowerCase()
  if (label.startsWith(needle)) return 4
  if (haystack.includes(needle)) return 3
  let i = 0
  for (const char of haystack) {
    if (char === needle[i]) i++
    if (i === needle.length) return 1
  }
  return 0
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, togglePalette } = useApp()

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        togglePalette()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [togglePalette])

  return <AnimatePresence>{paletteOpen && <PaletteDialog onClose={() => setPaletteOpen(false)} />}</AnimatePresence>
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const { reduced, toggle: toggleMotion } = useMotionPreference()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const commands = useMemo<Command[]>(() => {
    const go = (to: string) => () => navigate(to)
    const open = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer')
    return [
      { id: 'home', label: 'Home', group: 'Navigate', icon: TbHome, hint: '/', run: go('/') },
      { id: 'about', label: 'About', group: 'Navigate', icon: TbUser, keywords: 'bio me skills', hint: '/about', run: go('/about') },
      { id: 'projects', label: 'Projects', group: 'Navigate', icon: TbFolder, keywords: 'work portfolio', hint: '/projects', run: go('/projects') },
      { id: 'contact', label: 'Contact', group: 'Navigate', icon: TbMessage, keywords: 'hire email message', hint: '/contact', run: go('/contact') },
      ...projects.map<Command>((project) => ({
        id: `project-${project.slug}`,
        label: project.title,
        group: 'Projects',
        icon: TbCode,
        keywords: `${project.tags.join(' ')} ${project.category}`,
        hint: project.year,
        run: go(`/projects/${project.slug}`),
      })),
      ...profile.socials.map<Command>((social) => ({
        id: `social-${social.id}`,
        label: social.label,
        group: 'Links',
        icon: SOCIAL_ICONS[social.id],
        keywords: 'social profile',
        hint: '↗',
        run: open(social.href),
      })),
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: TbCopy,
        keywords: profile.email,
        run: () => void copyToClipboard(profile.email, 'Email copied to clipboard'),
      },
      {
        id: 'send-email',
        label: 'Send an email',
        group: 'Actions',
        icon: TbMail,
        keywords: 'mail write',
        hint: '↗',
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
      { id: 'top', label: 'Back to top', group: 'Actions', icon: TbArrowUp, keywords: 'scroll up', run: () => scrollToTop() },
      {
        id: 'motion',
        label: reduced ? 'Enable animations' : 'Reduce animations',
        group: 'Actions',
        icon: TbSparkles,
        keywords: 'motion animation accessibility reduced',
        run: toggleMotion,
      },
    ]
  }, [navigate, reduced, toggleMotion])

  const results = useMemo(
    () =>
      commands
        .map((command) => ({ command, score: score(command, query) }))
        .filter((entry) => entry.score > 0)
        .sort(
          (a, b) => GROUP_ORDER.indexOf(a.command.group) - GROUP_ORDER.indexOf(b.command.group) || b.score - a.score,
        )
        .map((entry) => entry.command),
    [commands, query],
  )

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0))

  useEffect(() => {
    const release = lockScroll()
    const previouslyFocused = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => {
      release()
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const run = (command: Command) => {
    onClose()
    command.run()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = results.length
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (count) setActive((activeIndex + 1) % count)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (count) setActive((activeIndex - 1 + count) % count)
        break
      case 'Enter': {
        event.preventDefault()
        const command = results[activeIndex]
        if (command) run(command)
        break
      }
      case 'Escape':
        event.preventDefault()
        onClose()
        break
      case 'Tab':
        event.preventDefault()
        break
    }
  }

  let runningIndex = -1

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={styles.panel}
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } }}
        exit={{ opacity: 0, scale: 0.97, y: -8, transition: { duration: 0.18 } }}
        onKeyDown={onKeyDown}
      >
        <div className={styles.search}>
          <TbSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            placeholder="Search pages, projects, actions…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <div ref={listRef} className={styles.list} id={listId} role="listbox" aria-label="Results" data-lenis-prevent>
          {results.length === 0 && (
            <p className={styles.empty}>
              Nothing found for “{query}”. <br />
              Try “projects” or “email”.
            </p>
          )}
          {GROUP_ORDER.map((group) => {
            const items = results.filter((command) => command.group === group)
            if (!items.length) return null
            return (
              <div key={group} role="presentation">
                <p className={styles.group} role="presentation">
                  {group}
                </p>
                {items.map((command) => {
                  runningIndex += 1
                  const index = runningIndex
                  const selected = index === activeIndex
                  const Icon = command.icon
                  return (
                    <div
                      key={command.id}
                      id={`${listId}-${command.id}`}
                      role="option"
                      aria-selected={selected}
                      data-index={index}
                      className={cn(styles.item, selected && styles.selected)}
                      onMouseMove={() => {
                        if (!selected) setActive(index)
                      }}
                      onClick={() => run(command)}
                    >
                      {selected && <motion.span layoutId="palette-active" className={styles.highlight} transition={springSnappy} />}
                      <span className={styles.itemIcon}>
                        <Icon aria-hidden="true" />
                      </span>
                      <span className={styles.label}>{command.label}</span>
                      {command.hint && <span className={styles.hint}>{command.hint}</span>}
                      {selected && <TbCornerDownLeft className={styles.enter} aria-hidden="true" />}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> navigate
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> open
          </span>
          <span className={styles.brand}>
            {profile.name} <TbArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
