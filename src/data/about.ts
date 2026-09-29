import type { IconType } from 'react-icons'
import { TbDeviceDesktop, TbDeviceGamepad2, TbServer } from 'react-icons/tb'

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Service {
  icon: IconType
  title: string
  text: string
  tags: string[]
}

export interface ProcessStep {
  title: string
  text: string
}

export const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Years of commercial experience' },
  { value: 40, suffix: '+', label: 'Projects & scripts shipped' },
  { value: 4000, suffix: '+', label: 'Happy clients' },
  { value: 100, suffix: '%', label: 'Backend obsession' },
]

export const services: Service[] = [
  {
    icon: TbServer,
    title: 'Backend & APIs',
    text: 'Server-side logic, REST APIs and database design in Node.js and SQL — the part nobody sees, but everything depends on.',
    tags: ['Node.js', 'REST APIs', 'MySQL'],
  },
  {
    icon: TbDeviceGamepad2,
    title: 'FiveM Development',
    text: 'Custom Lua resources for roleplay servers — MDT, phone, banking, jobs, HUDs and vehicle systems, synced between client, server and database.',
    tags: ['Lua', 'FiveM', 'NUI'],
  },
  {
    icon: TbDeviceDesktop,
    title: 'Web & App Development',
    text: 'Functional interfaces in React, TypeScript and Vue — dashboards, panels and in-game UIs that are clear, fast and easy to maintain.',
    tags: ['React', 'TypeScript', 'Vue.js'],
  },
]

export const processSteps: ProcessStep[] = [
  { title: 'Discover', text: 'We talk goals, users and constraints. I ask a lot of questions.' },
  { title: 'Plan', text: 'Data model, API contracts and a clear technical plan before the first commit.' },
  { title: 'Build', text: 'Iterative development with regular builds you can test on a live server.' },
  { title: 'Launch & support', text: 'Deployment, bug fixing and ongoing technical support — also after release.' },
]

export const marqueeItems = [
  'Fullstack development',
  'Backend & APIs',
  'FiveM scripting',
  'Database design',
  'Web & app development',
  'Debugging & support',
]
