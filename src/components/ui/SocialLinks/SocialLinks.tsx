import type { IconType } from 'react-icons'
import { TbBrandDribbble, TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandX } from 'react-icons/tb'
import { profile, type SocialId } from '@/data/profile'
import { cn } from '@/lib/cn'
import { Magnetic } from '../Magnetic/Magnetic'
import styles from './SocialLinks.module.scss'

export const SOCIAL_ICONS: Record<SocialId, IconType> = {
  github: TbBrandGithub,
  linkedin: TbBrandLinkedin,
  instagram: TbBrandInstagram,
  x: TbBrandX,
  dribbble: TbBrandDribbble,
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn(styles.list, className)}>
      {profile.socials.map((social) => {
        const Icon = SOCIAL_ICONS[social.id]
        return (
          <li key={social.id}>
            <Magnetic strength={0.45}>
              <a
                className={styles.link}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                data-label={social.label}
              >
                <Icon className={styles.icon} strokeWidth={1.4} aria-hidden="true" />
              </a>
            </Magnetic>
          </li>
        )
      })}
    </ul>
  )
}
