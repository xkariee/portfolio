import type { IconType } from 'react-icons'
import {
  SiCss,
  SiDocker,
  SiFivem,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLua,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

export type StackCategory = 'Backend' | 'Frontend' | 'Game Dev' | 'Tooling'

export interface Tech {
  name: string
  icon: IconType
  color: string
  category: StackCategory
  learning?: boolean
}

export const stackCategories: StackCategory[] = ['Backend', 'Frontend', 'Game Dev', 'Tooling']

export const stack: Tech[] = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e', category: 'Backend' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1', category: 'Backend' },
  { name: 'REST APIs', icon: TbApi, color: '#22d3ee', category: 'Backend' },
  { name: 'Python', icon: SiPython, color: '#3776ab', category: 'Backend' },
  { name: 'Java', icon: SiOpenjdk, color: '#f89820', category: 'Backend', learning: true },
  { name: 'Lua', icon: SiLua, color: '#6b6cff', category: 'Game Dev' },
  { name: 'FiveM', icon: SiFivem, color: '#f40552', category: 'Game Dev' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'Frontend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'Frontend' },
  { name: 'React', icon: SiReact, color: '#61dafb', category: 'Frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4fc08d', category: 'Frontend' },
  { name: 'HTML', icon: SiHtml5, color: '#e34f26', category: 'Frontend' },
  { name: 'CSS', icon: SiCss, color: '#663399', category: 'Frontend' },
  { name: 'Sass / SCSS', icon: SiSass, color: '#cc6699', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', category: 'Frontend' },
  { name: 'Git', icon: SiGit, color: '#f05032', category: 'Tooling' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: 'Tooling' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'Tooling' },
  { name: 'Vite', icon: SiVite, color: '#9d6bff', category: 'Tooling' },
]
