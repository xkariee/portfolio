export interface NavLinkItem {
  to: string
  label: string
}

export const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]
