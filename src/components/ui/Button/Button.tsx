import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { Magnetic } from '../Magnetic/Magnetic'
import { RollText } from '../RollText/RollText'
import styles from './Button.module.scss'

interface BaseProps {
  children: string
  icon?: ReactNode
  iconEnd?: ReactNode
  variant?: 'outline' | 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  className?: string
  cursor?: string
}

interface RouterLinkProps extends BaseProps {
  to: string
  href?: never
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

interface AnchorProps extends BaseProps {
  href: string
  to?: never
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

interface NativeButtonProps extends BaseProps {
  to?: never
  href?: never
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export type ButtonProps = RouterLinkProps | AnchorProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const { children, icon, iconEnd, variant = 'outline', size = 'md', magnetic = false, className, cursor } = props
  const classes = cn(styles.button, styles[variant], styles[size], className)

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <RollText text={children} />
      {iconEnd && <span className={cn(styles.icon, styles.iconEnd)}>{iconEnd}</span>}
    </>
  )

  let element: ReactElement
  if (props.to !== undefined) {
    element = (
      <Link to={props.to} className={classes} onClick={props.onClick} data-cursor={cursor}>
        {content}
      </Link>
    )
  } else if (props.href !== undefined) {
    const external = /^https?:\/\//.test(props.href)
    element = (
      <a
        href={props.href}
        className={classes}
        onClick={props.onClick}
        data-cursor={cursor}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  } else {
    element = (
      <button
        type={props.type ?? 'button'}
        className={classes}
        disabled={props.disabled}
        onClick={props.onClick}
        data-cursor={cursor}
      >
        {content}
      </button>
    )
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element
}
