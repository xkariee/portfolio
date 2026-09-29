import { useState, type CSSProperties, type ReactNode } from 'react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'
import styles from './Avatar.module.scss'

export function Avatar({ size = 76 }: { size?: number | string }) {
  const [flipped, setFlipped] = useState(false)
  const canFlip = Boolean(profile.avatar && profile.avatarHover)
  const style = { '--size': typeof size === 'number' ? `${size}px` : size } as CSSProperties

  const front = profile.avatar ? (
    <img className={styles.image} src={profile.avatar} alt={profile.name} width={240} height={240} />
  ) : (
    <span className={styles.initials} aria-hidden="true">
      {profile.initials}
    </span>
  )

  const content = (back?: ReactNode) => (
    <>
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.orbit} aria-hidden="true" />
      <span className={styles.card}>
        <span className={cn(styles.face, styles.front)}>{front}</span>
        {back}
      </span>
      {profile.available && (
        <span className={styles.status} title={profile.availability}>
          <span className="sr-only">{profile.availability}</span>
        </span>
      )}
    </>
  )

  if (!canFlip) {
    return (
      <span className={styles.avatar} style={style}>
        {content()}
      </span>
    )
  }

  const toggleOnTouch = () => {
    if (!window.matchMedia('(hover: hover)').matches) setFlipped((value) => !value)
  }

  return (
    <button
      type="button"
      className={cn(styles.avatar, styles.flippable, flipped && styles.flipped)}
      style={style}
      onClick={toggleOnTouch}
      aria-label={`${profile.name} — flip photo`}
      aria-pressed={flipped}
    >
      {content(
        <span className={cn(styles.face, styles.back)}>
          <img className={styles.image} src={profile.avatarHover} alt="" width={240} height={240} />
        </span>,
      )}
    </button>
  )
}
