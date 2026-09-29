import { projects } from '@/data/projects'

const STATIC_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
}

export function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function getRouteLabel(pathname: string) {
  const path = normalizePath(pathname)
  if (path in STATIC_LABELS) return STATIC_LABELS[path]

  const match = /^\/projects\/([^/]+)$/.exec(path)
  if (match) return projects.find((p) => p.slug === match[1])?.title ?? 'Not found'

  return 'Not found'
}
