export type SocialId = 'github' | 'linkedin' | 'instagram' | 'x' | 'dribbble'

export interface SocialLink {
  id: SocialId
  label: string
  href: string
}

export interface Profile {
  name: string
  initials: string
  role: string
  headline: [string, string]
  location: string
  city: string
  countryCode: string
  timeZone: string
  email: string
  avatar: string
  avatarHover: string
  available: boolean
  availability: string
  intro: string
  manifesto: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Karol Mostowy',
  initials: 'KM',
  role: 'Fullstack Developer',
  headline: ['Fullstack', 'Developer'],
  location: 'Poland',
  city: 'Wroclaw',
  countryCode: 'PL',
  timeZone: 'Europe/Warsaw',
  email: 'mostowyk26@gmail.com',
  avatar: '/logos/profile.jpg',
  avatarHover: '/logos/coolprofile-avatar.jpg',
  available: true,
  availability: 'Available for new projects',
  intro:
    "A fullstack developer with a backend heart. For the past few years I've been building commercial FiveM software — Lua game logic, Node.js services, MySQL databases and React interfaces used by thousands of players every day. Right now I'm learning Java by building Minecraft plugins.",
  manifesto:
    "I care most about what happens behind the interface: clean data models, reliable server logic and systems that don't fall over when a whole server hits them at once. A good UI should be simple and fast — the hard work belongs on the backend.",
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/kariee/' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/xkariee' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/karieeig' },
  ],
}
