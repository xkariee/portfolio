import { asset } from '@/lib/asset'

export type ProjectCategory = 'FiveM' | 'Minecraft' | 'Web App' | 'Automation'

export type CoverVariant = 'dashboard' | 'map' | 'shop' | 'mobile' | 'editor' | 'landing' | 'voxel'

export interface Project {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  year: string
  role: string
  client: string
  tags: string[]
  image?: string
  imagePosition?: string
  showcase?: string[]
  gallery?: string[]
  cover: { variant: CoverVariant; from: string; to: string; accent: string }
  overview: string
  challenge: string
  solution: string
  highlights: string[]
  links: { live?: string; repo?: string }
  featured?: boolean
  inProgress?: boolean
}

export const projectCategories: ProjectCategory[] = ['FiveM', 'Minecraft', 'Web App', 'Automation']

export const projects: Project[] = [
  {
    slug: 'axieeworld',
    title: 'AxieeWorld',
    tagline:
      'A Minecraft server we are building together — with our own AxiomCorePlugin and AxiomOneblock plugins. Work in progress, and my playground for learning Java.',
    category: 'Minecraft',
    year: '2026',
    role: 'Co-developer',
    client: 'AxieeWorld · team project',
    tags: ['Java', 'Minecraft', 'Plugins'],
    cover: { variant: 'voxel', from: '#08140c', to: '#050a07', accent: '#4ade80' },
    showcase: [asset('/projects/axieeworld/3.png'), asset('/projects/axieeworld/5.png'), asset('/projects/axieeworld/6.png')],
    gallery: [
      asset('/projects/axieeworld/1.png'),
      asset('/projects/axieeworld/3.png'),
      asset('/projects/axieeworld/5.png'),
      asset('/projects/axieeworld/4.png'),
      asset('/projects/axieeworld/2.png'),
      asset('/projects/axieeworld/6.png'),
    ],
    overview:
      'AxieeWorld is a Minecraft server we are building together as a team. Instead of stacking dozens of ready-made plugins, we write our own: AxiomCorePlugin holds the core features of the server, and AxiomOneblock is a custom OneBlock game mode built on top of it.',
    challenge:
      'It is my first bigger project in Java, and I am still learning the language. Coming from Lua and TypeScript, I had to get comfortable with Java’s object-oriented structure and the event-driven plugin API — while writing code the rest of the team builds on.',
    solution:
      'We split the server into separate plugins: a shared core with the common features, and the OneBlock game mode as its own plugin on top of it. That keeps the code easier to understand, test and extend — and gives me a real project to learn Java on.',
    highlights: [
      'AxiomCorePlugin — our own core plugin for the server',
      'AxiomOneblock — a custom OneBlock game mode',
      'Built together as a team',
      'My hands-on project for learning Java',
    ],
    links: {},
    inProgress: true,
  },
  {
    slug: 'fivem-police-mdt',
    title: 'FiveM Police MDT',
    tagline:
      'An advanced police MDT for FiveM roleplay servers — live dispatch map, bodycams, speed radar and department management in one tablet.',
    category: 'FiveM',
    year: '2025',
    role: 'Fullstack Developer',
    client: 'FiveM roleplay servers',
    tags: ['Lua', 'React', 'TypeScript', 'MySQL'],
    cover: { variant: 'map', from: '#0a1428', to: '#050a14', accent: '#3b82f6' },
    image: asset('/projects/fivem-police-mdt/1.png'),
    gallery: [asset('/projects/fivem-police-mdt/1.png'), asset('/projects/fivem-police-mdt/2.png'), asset('/projects/fivem-police-mdt/3.png')],
    overview:
      'A complete Mobile Data Terminal for police departments on FiveM roleplay servers. Officers get a dispatch system with a live map of units and calls, bodycam feeds and a speed radar, while command staff manage rosters, ranks and records from the same in-game tablet.',
    challenge:
      'An MDT is open during the whole shift, by many officers at once. Unit positions and calls have to stay in sync for everyone, records must be persistent, and none of it can hurt server performance or be abused from the client side.',
    solution:
      'The game logic lives in Lua on the server, which owns the state and validates every request coming from the UI. The interface is a React + TypeScript app talking to it through NUI callbacks, and records are stored in MySQL with indexed queries, so searches stay fast as the database grows.',
    highlights: [
      'Dispatch system with a live map of units and calls',
      'Bodycam and speed radar modules',
      'Management modules for ranks, rosters and records',
      'Server-authoritative Lua backend with validated NUI callbacks',
    ],
    links: {},
    featured: true,
  },
  {
    slug: 'fivem-phone-system',
    title: 'FiveM Phone System',
    tagline:
      'A full-featured in-game phone with a modular React UI, real-time notifications, messaging, invites and persistent storage.',
    category: 'FiveM',
    year: '2024',
    role: 'Fullstack Developer',
    client: 'FiveM roleplay servers',
    tags: ['Lua', 'React', 'TypeScript', 'JavaScript', 'MySQL'],
    cover: { variant: 'mobile', from: '#0d0b24', to: '#070614', accent: '#818cf8' },
    showcase: [asset('/projects/fivem-phone-system/2_cutout.png'), asset('/projects/fivem-phone-system/1_cutout.png'), asset('/projects/fivem-phone-system/3_cutout.png')],
    gallery: [
      asset('/projects/fivem-phone-system/1_cutout.png'),
      asset('/projects/fivem-phone-system/2_cutout.png'),
      asset('/projects/fivem-phone-system/3_cutout.png'),
      asset('/projects/fivem-phone-system/4_cutout.png'),
      asset('/projects/fivem-phone-system/5_cutout.png'),
    ],
    overview:
      'The smartphone players use all the time during roleplay: messages, notifications, invites and apps, all inside a React interface. Every app is a separate module, so new features can be added without touching the rest of the phone.',
    challenge:
      'The phone is the most used interface on a roleplay server. Messages and notifications have to arrive instantly, work for players who are offline at the moment and survive server restarts.',
    solution:
      'A Lua backend routes events between players in real time and stores messages, contacts and settings in MySQL, so nothing is lost after a restart. The React UI is split into independent app modules that plug into a shared phone shell.',
    highlights: [
      'Real-time notifications and messaging between players',
      'Invites and persistent data stored in MySQL',
      'Modular apps — new features without touching the core',
      'React + TypeScript NUI with a Lua backend',
    ],
    links: {},
    featured: true,
  },
  {
    slug: 'fivem-character-creator',
    title: 'FiveM Character Creator',
    tagline:
      'An advanced character customization system with a React interface, skin and clothing editor and texture previews generated in game.',
    category: 'FiveM',
    year: '2023',
    role: 'Fullstack Developer',
    client: 'FiveM roleplay servers',
    tags: ['Lua', 'React', 'TypeScript', 'JavaScript', 'MySQL'],
    cover: { variant: 'editor', from: '#0a1020', to: '#06080f', accent: '#60a5fa' },
    image: asset('/projects/fivem-character-creator/1.png'),
    gallery: [
      asset('/projects/fivem-character-creator/1.png'),
      asset('/projects/fivem-character-creator/2.png'),
      asset('/projects/fivem-character-creator/3.png'),
    ],
    overview:
      'The first thing every player sees on a roleplay server. The creator lets players shape their character, pick skins and clothing and browse texture variants with previews generated directly in the game — then saves everything to the database.',
    challenge:
      'GTA V has thousands of clothing and texture combinations. Browsing them blindly by numeric ID is painful, and the chosen look has to load correctly every single time the player joins.',
    solution:
      'Previews are generated in game and shown in the React interface, so players choose clothes visually instead of by ID. The Lua backend validates the final appearance and stores it in MySQL, from where it is restored on every spawn.',
    highlights: [
      'Skin and clothing customization',
      'Texture previews generated in game',
      'Appearance saved to and restored from the database',
      'React + TypeScript NUI with a Lua backend',
    ],
    links: {},
  },
  {
    slug: 'fivem-radio-system',
    title: 'Radio System',
    tagline: 'A radio system for FiveM with playlist management, recently played tracks and music search powered by the Google API.',
    category: 'FiveM',
    year: '2022',
    role: 'Fullstack Developer',
    client: 'FiveM roleplay servers',
    tags: ['Lua', 'Vue.js', 'TypeScript', 'MySQL', 'Google API'],
    cover: { variant: 'dashboard', from: '#071716', to: '#050b0b', accent: '#2dd4bf' },
    image: asset('/projects/fivem-radio-system/2.png'),
    gallery: [
      asset('/projects/fivem-radio-system/2.png'),
      asset('/projects/fivem-radio-system/3.png'),
      asset('/projects/fivem-radio-system/4.png'),
      asset('/projects/fivem-radio-system/5.png'),
      asset('/projects/fivem-radio-system/1.png'),
    ],
    overview:
      'An in-game radio that lets players search for music, build playlists and come back to recently played tracks. Search results come from the Google API, while playlists and history are stored per player in the database.',
    challenge:
      'Calling an external API straight from the game client would expose the API key and make it easy to spam requests. Playlists and history also had to be kept per player between sessions.',
    solution:
      'All Google API requests go through the Lua server, which holds the key and returns only the data the UI needs. Playlists and recently played tracks are saved in MySQL, and the Vue + TypeScript interface stays a thin layer on top of the server state.',
    highlights: [
      'Music search via the Google API, handled server-side',
      'Playlist management saved per player',
      'Recently played history',
      'Vue + TypeScript NUI with a Lua backend',
    ],
    links: {},
  },
  {
    slug: 'job-hunter',
    title: 'Job Hunter',
    tagline: 'A modular job listing platform with credential-based search and auto-apply — React UI on top of a Node.js backend.',
    category: 'Web App',
    year: '2025',
    role: 'Fullstack Developer',
    client: 'Personal project',
    tags: ['React', 'Node.js', 'SQL', 'Docker'],
    cover: { variant: 'dashboard', from: '#0f1220', to: '#090b14', accent: '#6366f1' },
    image: asset('/projects/job-hunter/1_redacted.png'),
    imagePosition: 'left center',
    gallery: [
      asset('/projects/job-hunter/1_redacted.png'),
      asset('/projects/job-hunter/2_redacted.png'),
      asset('/projects/job-hunter/3_redacted.png'),
      asset('/projects/job-hunter/4_redacted.png'),
    ],
    overview:
      'Job Hunter collects job offers in one place and matches them to your profile. You search by your skills and credentials instead of scrolling through endless job boards, and the auto-apply module can send applications to matching offers for you.',
    challenge:
      'Job offers come in different shapes and change all the time. The system needed one consistent data model, search based on real skills rather than loose keywords, and automated applications that never go out twice.',
    solution:
      'A modular Node.js backend normalises offers into a single SQL schema and exposes them through a REST API. The React frontend handles search and filtering, auto-apply keeps track of already submitted applications, and the whole stack runs in Docker containers.',
    highlights: [
      'Search based on skills and credentials',
      'Auto-apply that skips offers you already applied to',
      'Modular Node.js REST API with SQL database integration',
      'Dockerised setup — the whole stack starts with one command',
    ],
    links: {},
  },
  {
    slug: 'discord-bot',
    title: 'Discord Bot',
    tagline: 'A custom Discord bot for server management — ticket handling, invite tracking, automated notifications and custom integrations.',
    category: 'Automation',
    year: '2021',
    role: 'Developer',
    client: 'Discord communities',
    tags: ['Python', 'Discord API'],
    cover: { variant: 'editor', from: '#0d0f24', to: '#07081a', accent: '#5865f2' },
    showcase: [asset('/projects/discord-bot/7.png'), asset('/projects/discord-bot/1_redacted.png')],
    gallery: [
      asset('/projects/discord-bot/7.png'),
      asset('/projects/discord-bot/1_redacted.png'),
      asset('/projects/discord-bot/2_redacted.png'),
      asset('/projects/discord-bot/6_redacted.png'),
      asset('/projects/discord-bot/4_redacted.png'),
      asset('/projects/discord-bot/3_redacted.png'),
      asset('/projects/discord-bot/5_redacted.png'),
    ],
    overview:
      'A Python bot built to run Discord communities. It handles support tickets, tracks invites, sends automated notifications and connects the server with external services through custom integrations.',
    challenge:
      'Managing a large community by hand means lost support requests, no idea where new members come from and moderators repeating the same tasks every day.',
    solution:
      'The bot turns support into a ticket flow with private channels, keeps track of who invited whom and automates recurring notifications. Integrations are written as separate modules, so every server enables only what it needs.',
    highlights: [
      'Ticket system with private support channels',
      'Invite tracking',
      'Automated notifications',
      'Custom integrations as separate modules',
    ],
    links: {},
  },
  {
    slug: 'portfolio-v2',
    title: 'Portfolio v2',
    tagline: 'The site you are looking at — React, TypeScript, SCSS and a lot of motion.',
    category: 'Web App',
    year: '2026',
    role: 'Development',
    client: 'Personal',
    tags: ['React', 'TypeScript', 'SCSS', 'Vite'],
    cover: { variant: 'landing', from: '#07121a', to: '#0b0716', accent: '#4d6bff' },
    overview:
      'My personal playground. A dark, aurora-lit portfolio with a variable-font hero, page curtains, a command palette and a custom cursor.',
    challenge: 'Make it feel alive without sacrificing performance or accessibility.',
    solution:
      'Motion is layered carefully: CSS for the ambient stuff, springs for interactions, and everything respects prefers-reduced-motion.',
    highlights: [
      'Variable-font proximity effect in the hero',
      'Page transitions with a curtain reveal',
      'Command palette (Ctrl / ⌘ + K)',
      'Respects prefers-reduced-motion',
    ],
    links: { live: 'https://kariee.ovh' },
  },
]
