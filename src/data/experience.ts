export interface TimelineItem {
  id: string
  period: string
  title: string
  subtitle: string
  description?: string
  initials: string
  logo?: string
  accent: string
  current?: boolean
  tags?: string[]
}

export const work: TimelineItem[] = [
  {
    id: 'qfdevelopers',
    period: 'Oct 2020 — May 2026',
    title: 'QFDevelopers',
    subtitle: 'Full-Stack Developer',
    description:
      'Developed and maintained commercial FiveM software — MDT, banking, character customization, jobs, HUDs and vehicle systems. Lua game logic, Node.js services, MySQL databases and React interfaces, plus bug fixing, testing and technical support for customers.',
    initials: 'QF',
    accent: '#4d6bff',
    tags: ['Lua', 'React', 'TypeScript', 'Node.js', 'MySQL'],
  },
  {
    id: 'library',
    period: 'Jul 2024 — Aug 2024',
    title: 'Municipal Library',
    subtitle: 'Administrative Assistant',
    initials: 'ML',
    accent: '#16a394',
  },
  {
    id: 'freelance',
    period: 'Jan 2018 — Sep 2020',
    title: 'Freelance',
    subtitle: 'Independent Developer',
    description:
      'Personal and commissioned software projects — web interfaces and game-related systems built with JavaScript, HTML, CSS, Lua and databases.',
    initials: 'FL',
    accent: '#e0567a',
    tags: ['JavaScript', 'Lua', 'HTML', 'CSS'],
  },
]

export const studies: TimelineItem[] = [
  {
    id: 'wsb',
    period: '2026 — 2030',
    title: 'WSB Merito University',
    subtitle: 'Computer Science — Wroclaw, Poland',
    description: 'Computer Science with a specialisation in game development.',
    initials: 'WSB',
    accent: '#4d6bff',
    logo: '/logos/wsb.png',
    current: true,
  },
  {
    id: 'highschool',
    period: '2021 — 2026',
    title: 'ZSZ Zabkowice Slaskie',
    subtitle: 'Technical High School — IT Technician',
    description:
      'Specialisation in web and app development. First websites, first bugs and the beginning of a long love story with software and web development.',
    initials: 'ZSZ',
    accent: '#e0567a',
    logo: '/logos/zsz.png',
  },
]
