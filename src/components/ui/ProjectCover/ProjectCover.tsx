import { useId, type CSSProperties, type ReactNode } from 'react'
import type { Project } from '@/data/projects'
import styles from './ProjectCover.module.scss'

interface SceneProps {
  accent: string
}

export function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        className={styles.image}
        src={project.image}
        alt={`${project.title} — preview`}
        style={{ objectPosition: project.imagePosition }}
        loading="lazy"
        decoding="async"
      />
    )
  }
  if (project.showcase?.length) return <Showcase project={project} />
  return <GeneratedCover project={project} />
}

function Showcase({ project }: { project: Project }) {
  const { from, to, accent } = project.cover
  const shots = project.showcase!.slice(0, 3)
  return (
    <div
      className={styles.showcase}
      style={{ '--from': from, '--to': to, '--accent': accent, '--count': shots.length } as CSSProperties}
      role="img"
      aria-label={`${project.title} — preview`}
    >
      <div className={styles.shots}>
        {shots.map((src) => (
          <img key={src} className={styles.shot} src={src} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  )
}

function GeneratedCover({ project }: { project: Project }) {
  const uid = `pc${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const { variant, from, accent } = project.cover

  return (
    <svg
      className={styles.cover}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${project.title} — preview`}
    >
      <defs>
        <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.05" />
        </pattern>
        <clipPath id={`${uid}-window`}>
          <rect width="660" height="470" rx="14" />
        </clipPath>
      </defs>

      <rect width="800" height="500" fill={from} />
      <rect width="800" height="500" fill={`url(#${uid}-grid)`} />

      <g className={styles.scene}>
        {variant === 'mobile' ? (
          <MobileScene accent={accent} />
        ) : variant === 'voxel' ? (
          <VoxelScene uid={uid} accent={accent} />
        ) : (
          <BrowserWindow uid={uid} light={variant === 'map'}>
            {variant === 'dashboard' && <DashboardScene accent={accent} />}
            {variant === 'map' && <MapScene accent={accent} />}
            {variant === 'shop' && <ShopScene accent={accent} />}
            {variant === 'editor' && <EditorScene accent={accent} />}
            {variant === 'landing' && <LandingScene />}
          </BrowserWindow>
        )}
      </g>
    </svg>
  )
}

function BrowserWindow({ uid, light, children }: { uid: string; light: boolean; children: ReactNode }) {
  const ink = light ? '#000' : '#fff'
  return (
    <g transform="translate(70 64)">
      <g clipPath={`url(#${uid}-window)`}>
        <rect width="660" height="470" fill={light ? '#f5f6f8' : '#0a0a0f'} fillOpacity={light ? 1 : 0.94} />
        <g transform="translate(0 38)">{children}</g>
        <rect width="660" height="38" fill={light ? '#fff' : '#111118'} />
        <circle cx="22" cy="19" r="5" fill="#ff5f57" />
        <circle cx="40" cy="19" r="5" fill="#febc2e" />
        <circle cx="58" cy="19" r="5" fill="#28c840" />
        <rect x="240" y="10" width="180" height="18" rx="9" fill={ink} fillOpacity="0.07" />
        <line x1="0" y1="38" x2="660" y2="38" stroke={ink} strokeOpacity="0.08" />
      </g>
      <rect width="660" height="470" rx="14" fill="none" stroke="#fff" strokeOpacity="0.16" />
    </g>
  )
}

function Card({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="10" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.08" />
}

function DashboardScene({ accent }: SceneProps) {
  const kpis = [
    { label: 'Requests', value: '48.2k' },
    { label: 'Active users', value: '1,240' },
    { label: 'Uptime', value: '99.9%' },
  ]
  const bars = [38, 62, 45, 80, 56, 92, 70]
  return (
    <>
      <rect width="132" height="432" fill="#fff" fillOpacity="0.025" />
      <circle cx="28" cy="30" r="9" fill={accent} />
      <rect x="44" y="26" width="56" height="8" rx="4" fill="#fff" fillOpacity="0.55" />
      {[86, 70, 92, 64, 78].map((w, i) => (
        <rect
          key={i}
          x="18"
          y={70 + i * 30}
          width={w}
          height="8"
          rx="4"
          fill={i === 0 ? accent : '#fff'}
          fillOpacity={i === 0 ? 0.9 : 0.14}
        />
      ))}

      {kpis.map((kpi, i) => (
        <g key={kpi.label} transform={`translate(${152 + i * 166} 20)`}>
          <Card x={0} y={0} w={150} h={80} />
          <text x="14" y="26" fill="#fff" fillOpacity="0.5" fontSize="11">
            {kpi.label}
          </text>
          <text x="14" y="58" fill="#fff" fontSize="22" fontWeight="700">
            {kpi.value}
          </text>
          <path
            d="M100 60 L110 52 L118 56 L128 42 L138 46"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <g transform="translate(152 116)">
        <Card x={0} y={0} w={482} h={170} />
        <path
          d="M16 130 C 60 120, 80 70, 130 84 S 210 128, 260 92 S 340 30, 390 54 S 450 70, 466 40 L 466 154 L 16 154 Z"
          fill={accent}
          fillOpacity="0.14"
        />
        <path
          className={styles.line}
          d="M16 130 C 60 120, 80 70, 130 84 S 210 128, 260 92 S 340 30, 390 54 S 450 70, 466 40"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
        />
        <circle cx="390" cy="54" r="5" fill="#fff" stroke={accent} strokeWidth="3" />
      </g>

      <g transform="translate(152 302)">
        <Card x={0} y={0} w={236} h={110} />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={20 + i * 30}
            y={96 - h * 0.8}
            width="16"
            height={h * 0.8}
            rx="4"
            fill={i === 5 ? accent : '#fff'}
            fillOpacity={i === 5 ? 1 : 0.18}
          />
        ))}
      </g>

      <g transform="translate(400 302)">
        <Card x={0} y={0} w={234} h={110} />
        <circle cx="58" cy="55" r="30" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="10" />
        <circle
          cx="58"
          cy="55"
          r="30"
          fill="none"
          stroke={accent}
          strokeWidth="10"
          strokeDasharray="130 189"
          strokeLinecap="round"
          transform="rotate(-90 58 55)"
        />
        <rect x="108" y="36" width="90" height="8" rx="4" fill="#fff" fillOpacity="0.45" />
        <rect x="108" y="54" width="64" height="8" rx="4" fill="#fff" fillOpacity="0.15" />
        <rect x="108" y="72" width="76" height="8" rx="4" fill="#fff" fillOpacity="0.15" />
      </g>
    </>
  )
}

function Pin({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="2" rx="7" ry="3" fill="#000" fillOpacity="0.18" />
      <path d="M0 0 C -4 -8, -13 -14, -13 -24 A 13 13 0 1 1 13 -24 C 13 -14, 4 -8, 0 0 Z" fill={color} stroke="#fff" strokeWidth="2.5" />
      <circle cy="-24" r="4.5" fill="#fff" />
    </g>
  )
}

function MapScene({ accent }: SceneProps) {
  const blocks: Array<[number, number, number, number]> = [
    [150, 20, 90, 60],
    [150, 200, 70, 50],
    [350, 20, 80, 70],
    [350, 180, 60, 60],
    [490, 190, 90, 40],
    [40, 60, 70, 60],
    [540, 280, 80, 50],
  ]
  return (
    <>
      <rect width="660" height="432" fill="#e8ebef" />
      <path d="M-10 250 C 60 220, 120 260, 150 320 S 120 420, -10 430 Z" fill="#cfe7d5" />
      <ellipse cx="560" cy="110" rx="90" ry="58" fill="#cfe7d5" />
      <path d="M380 440 C 420 380, 520 350, 600 360 S 680 330, 700 310 L 700 440 Z" fill="#bcd6f3" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#d6dbe2" />
      ))}
      <path d="M-10 160 L 700 118" stroke="#fff" strokeWidth="18" />
      <path d="M280 -10 L 330 440" stroke="#fff" strokeWidth="14" />
      <path d="M-10 350 C 200 322, 380 290, 700 238" stroke="#fff" strokeWidth="11" fill="none" />
      <path d="M470 -10 L 440 440" stroke="#fff" strokeWidth="8" />
      <path
        className={styles.route}
        d="M120 318 C 200 300, 262 230, 300 170 S 400 140, 470 135 S 540 170, 560 190"
        fill="none"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />
      <circle cx="120" cy="318" r="8" fill="#fff" stroke={accent} strokeWidth="4" />
      <Pin x={560} y={192} color={accent} />
      <Pin x={392} y={100} color="#6b7cff" />
      <Pin x={220} y={112} color="#f59e0b" />

      <g transform="translate(20 20)">
        <rect width="250" height="44" rx="12" fill="#fff" stroke="#000" strokeOpacity="0.06" />
        <circle cx="24" cy="21" r="7" fill="none" stroke="#6b7280" strokeWidth="2" />
        <path d="M29 26 L 34 31" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
        <rect x="48" y="18" width="130" height="8" rx="4" fill="#111" fillOpacity="0.2" />
      </g>

      <g transform="translate(440 250)">
        <rect width="200" height="160" rx="14" fill="#fff" stroke="#000" strokeOpacity="0.06" />
        <rect x="12" y="12" width="176" height="64" rx="9" fill={accent} fillOpacity="0.2" />
        <rect x="12" y="90" width="120" height="10" rx="5" fill="#111" fillOpacity="0.8" />
        <rect x="12" y="110" width="150" height="8" rx="4" fill="#111" fillOpacity="0.22" />
        <rect x="12" y="128" width="84" height="22" rx="11" fill={accent} />
      </g>
    </>
  )
}

function Macaron({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="14" rx="44" ry="16" fill={color} />
      <ellipse cx="0" cy="4" rx="41" ry="6" fill="#fff6ec" />
      <ellipse cx="0" cy="-6" rx="44" ry="17" fill={color} />
      <ellipse cx="-14" cy="-12" rx="14" ry="4" fill="#fff" fillOpacity="0.3" />
    </g>
  )
}

function ShopScene({ accent }: SceneProps) {
  const products = [
    { color: '#f7a8c4', price: '€4.50' },
    { color: '#b9e3a8', price: '€4.90' },
    { color: '#c9b6f2', price: '€5.20' },
  ]
  return (
    <>
      <rect width="660" height="432" fill="#120c09" />
      <text x="330" y="30" textAnchor="middle" fill="#f3e5d0" fontSize="14" fontFamily="Georgia, serif" letterSpacing="5">
        MAISON DOUCE
      </text>
      <rect x="24" y="22" width="44" height="6" rx="3" fill="#f3e5d0" fillOpacity="0.4" />
      <circle cx="626" cy="25" r="7" fill="none" stroke="#f3e5d0" strokeOpacity="0.5" strokeWidth="2" />

      <g transform="translate(20 50)">
        <rect width="620" height="190" rx="14" fill={accent} />
        <text x="36" y="92" fill="#fff6ec" fontSize="58" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif">
          Douceur
        </text>
        <text x="38" y="122" fill="#fff6ec" fillOpacity="0.75" fontSize="14" fontFamily="Georgia, serif">
          Handmade pastries, baked every morning
        </text>
        <rect x="38" y="140" width="116" height="30" rx="15" fill="#fff6ec" />
        <text x="96" y="160" textAnchor="middle" fill="#2a1a10" fontSize="10.5" fontWeight="800" letterSpacing="1.6">
          ORDER NOW
        </text>
        <Macaron x={500} y={130} color="#c9b6f2" scale={1.05} />
        <Macaron x={470} y={88} color="#b9e3a8" />
        <Macaron x={530} y={56} color="#f7a8c4" scale={0.95} />
      </g>

      {products.map((product, i) => (
        <g key={i} transform={`translate(${20 + i * 212} 258)`}>
          <rect width="196" height="160" rx="12" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.07" />
          <circle cx="98" cy="62" r="40" fill={accent} fillOpacity="0.12" />
          <Macaron x={98} y={60} color={product.color} scale={0.62} />
          <rect x="16" y="116" width="96" height="8" rx="4" fill="#f3e5d0" fillOpacity="0.6" />
          <text x="180" y="124" textAnchor="end" fill="#f3e5d0" fontSize="13" fontWeight="700">
            {product.price}
          </text>
        </g>
      ))}
    </>
  )
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect width="190" height="392" rx="30" fill="#0a0a10" stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
      <rect x="70" y="12" width="50" height="14" rx="7" fill="#000" stroke="#fff" strokeOpacity="0.08" />
      <g transform="translate(16 44)">{children}</g>
    </g>
  )
}

function MobileScene({ accent }: SceneProps) {
  const rings = [
    { r: 50, color: accent, dash: 250 },
    { r: 37, color: '#ff5c8a', dash: 170 },
    { r: 24, color: '#5eead4', dash: 120 },
  ]
  const week = [40, 72, 55, 90, 64, 30, 80]
  return (
    <>
      <g transform="translate(190 70) rotate(-8)">
        <Phone>
          <text x="0" y="14" fill="#fff" fillOpacity="0.5" fontSize="11">
            Wednesday
          </text>
          <text x="0" y="40" fill="#fff" fontSize="24" fontWeight="800">
            Today
          </text>
          <g transform="translate(79 120)">
            {rings.map((ring) => (
              <g key={ring.r}>
                <circle r={ring.r} fill="none" stroke={ring.color} strokeOpacity="0.18" strokeWidth="10" />
                <circle
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${ring.dash} 400`}
                  transform="rotate(-90)"
                />
              </g>
            ))}
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${200 + i * 42})`}>
              <rect width="158" height="34" rx="10" fill="#fff" fillOpacity="0.05" />
              <circle cx="17" cy="17" r="8" fill={rings[i].color} />
              <rect x="34" y="11" width={[70, 56, 84][i]} height="6" rx="3" fill="#fff" fillOpacity="0.6" />
              <rect x="34" y="21" width="40" height="5" rx="2.5" fill="#fff" fillOpacity="0.25" />
            </g>
          ))}
        </Phone>
      </g>

      <g transform="translate(420 100) rotate(7)">
        <Phone>
          <text x="0" y="14" fill="#fff" fillOpacity="0.5" fontSize="11">
            Messages
          </text>
          <text x="0" y="42" fill="#fff" fontSize="26" fontWeight="800">
            3 new
          </text>
          <g transform="translate(0 70)">
            <rect width="158" height="120" rx="12" fill="#fff" fillOpacity="0.05" />
            {week.map((h, i) => (
              <rect
                key={i}
                x={12 + i * 20}
                y={104 - h}
                width="12"
                height={h}
                rx="4"
                fill={i === 3 ? accent : '#fff'}
                fillOpacity={i === 3 ? 1 : 0.22}
              />
            ))}
          </g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${206 + i * 40})`}>
              <rect width="158" height="32" rx="10" fill={i === 0 ? accent : '#fff'} fillOpacity={i === 0 ? 0.22 : 0.05} />
              <rect x="12" y="13" width={[90, 70, 80][i]} height="6" rx="3" fill="#fff" fillOpacity="0.6" />
            </g>
          ))}
        </Phone>
      </g>
    </>
  )
}

type Token = [color: string, width: number]

const SYNTAX = {
  keyword: '#c792ea',
  fn: '#82aaff',
  string: '#c3e88d',
  plain: '#a6accd',
  comment: '#5c6488',
  number: '#f78c6c',
}

const CODE: Array<{ indent: number; tokens: Token[] }> = [
  { indent: 0, tokens: [[SYNTAX.comment, 190]] },
  { indent: 0, tokens: [[SYNTAX.keyword, 44], [SYNTAX.plain, 70], [SYNTAX.keyword, 34], [SYNTAX.string, 96]] },
  { indent: 0, tokens: [[SYNTAX.keyword, 44], [SYNTAX.plain, 92], [SYNTAX.keyword, 34], [SYNTAX.string, 70]] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [[SYNTAX.keyword, 50], [SYNTAX.keyword, 60], [SYNTAX.fn, 96], [SYNTAX.plain, 30]] },
  { indent: 1, tokens: [[SYNTAX.keyword, 36], [SYNTAX.plain, 60], [SYNTAX.fn, 80], [SYNTAX.plain, 24]] },
  { indent: 1, tokens: [[SYNTAX.keyword, 36], [SYNTAX.plain, 48], [SYNTAX.fn, 64], [SYNTAX.number, 18], [SYNTAX.plain, 12]] },
  { indent: 1, tokens: [] },
  { indent: 1, tokens: [[SYNTAX.fn, 70], [SYNTAX.plain, 40], [SYNTAX.keyword, 30]] },
  { indent: 2, tokens: [[SYNTAX.plain, 60], [SYNTAX.fn, 84], [SYNTAX.string, 110]] },
  { indent: 2, tokens: [[SYNTAX.keyword, 46], [SYNTAX.plain, 120]] },
  { indent: 1, tokens: [[SYNTAX.plain, 26]] },
  { indent: 1, tokens: [[SYNTAX.keyword, 50], [SYNTAX.plain, 36], [SYNTAX.fn, 60]] },
  { indent: 0, tokens: [[SYNTAX.plain, 12]] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [[SYNTAX.comment, 150]] },
]

function EditorScene({ accent }: SceneProps) {
  return (
    <>
      <rect width="660" height="432" fill="#0b0c14" />
      <rect width="150" height="432" fill="#fff" fillOpacity="0.025" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i} transform={`translate(${i > 0 && i < 4 ? 30 : 16} ${20 + i * 26})`}>
          <rect width="12" height="10" rx="2" fill={i === 2 ? accent : '#fff'} fillOpacity={i === 2 ? 0.9 : 0.25} />
          <rect x="20" y="1" width={[70, 60, 76, 52, 66, 80, 58, 70][i]} height="8" rx="4" fill="#fff" fillOpacity={i === 2 ? 0.7 : 0.2} />
        </g>
      ))}

      <rect x="150" width="120" height="30" fill="#fff" fillOpacity="0.05" />
      <rect x="166" y="11" width="80" height="8" rx="4" fill="#fff" fillOpacity="0.6" />
      <rect x="150" y="28" width="120" height="2" fill={accent} />
      <rect x="286" y="11" width="70" height="8" rx="4" fill="#fff" fillOpacity="0.2" />

      {CODE.map((line, i) => {
        let x = 196 + line.indent * 24
        return (
          <g key={i}>
            <text x="184" y={60 + i * 22} textAnchor="end" fill="#fff" fillOpacity="0.2" fontSize="10" className={styles.mono}>
              {i + 1}
            </text>
            {line.tokens.map(([color, width], j) => {
              const rect = <rect key={j} x={x} y={52 + i * 22} width={width} height="8" rx="4" fill={color} fillOpacity="0.85" />
              x += width + 8
              return rect
            })}
          </g>
        )
      })}
      <rect className={styles.caret} x="300" y="249" width="2" height="14" fill={accent} />

      <g transform="translate(330 150)">
        <rect width="290" height="150" rx="12" fill="#15161f" stroke="#fff" strokeOpacity="0.12" />
        <circle cx="22" cy="24" r="6" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
        <rect x="38" y="20" width="120" height="8" rx="4" fill="#fff" fillOpacity="0.55" />
        <line x1="0" y1="46" x2="290" y2="46" stroke="#fff" strokeOpacity="0.08" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(8 ${56 + i * 30})`}>
            <rect width="274" height="26" rx="7" fill={i === 0 ? accent : 'transparent'} fillOpacity="0.22" />
            <rect x="12" y="9" width={[140, 110, 160][i]} height="8" rx="4" fill="#fff" fillOpacity={i === 0 ? 0.85 : 0.3} />
          </g>
        ))}
      </g>
    </>
  )
}

function LandingScene() {
  return (
    <>
      <rect width="660" height="432" fill="#040406" />
      <rect x="250" y="16" width="160" height="26" rx="13" fill="#fff" fillOpacity="0.03" stroke="#fff" strokeOpacity="0.2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={266 + i * 34} y="26" width="24" height="6" rx="3" fill="#fff" fillOpacity="0.65" />
      ))}
      <circle cx="286" cy="84" r="15" fill="#1c1f3a" stroke="#fff" strokeOpacity="0.7" />
      <rect x="309" y="75" width="78" height="9" rx="4.5" fill="#fff" />
      <rect x="309" y="89" width="52" height="6" rx="3" fill="#fff" fillOpacity="0.5" />
      <text x="330" y="168" textAnchor="middle" fill="#fff" fontSize="62" fontWeight="800" letterSpacing="-1">
        FULLSTACK
      </text>
      <text x="300" y="226" textAnchor="middle" fill="#fff" fontSize="62" fontWeight="800" letterSpacing="-1">
        DEVELOPER
      </text>
      <rect x="498" y="196" width="96" height="30" rx="15" fill="none" stroke="#fff" strokeOpacity="0.9" />
      <rect x="518" y="208" width="56" height="6" rx="3" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={294 + i * 36} cy="266" r="12" fill="none" stroke="#fff" strokeOpacity="0.75" />
      ))}
      <line x1="0" y1="320" x2="660" y2="320" stroke="#fff" strokeOpacity="0.08" />
      <rect x="120" y="350" width="90" height="8" rx="4" fill="#fff" fillOpacity="0.55" />
      <rect x="120" y="372" width="420" height="60" rx="10" fill="#fff" fillOpacity="0.03" stroke="#fff" strokeOpacity="0.5" />
    </>
  )
}

interface VoxelPalette {
  top: string[]
  side: string[]
  rim?: string[]
}

const GRASS: VoxelPalette = {
  top: ['#5da83a', '#5da83a', '#4f9530', '#6bbd45', '#58a236'],
  side: ['#86592f', '#86592f', '#764d28', '#976739', '#6e4624'],
  rim: ['#5da83a', '#4f9530', '#6bbd45'],
}
const STONE: VoxelPalette = {
  top: ['#8b8b8b', '#8b8b8b', '#7b7b7b', '#9b9b9b', '#727272'],
  side: ['#8b8b8b', '#8b8b8b', '#7b7b7b', '#9b9b9b', '#727272'],
}
const LOG: VoxelPalette = {
  top: ['#b8945f', '#a7834f', '#c3a06a'],
  side: ['#6b5132', '#5c452a', '#7a5d3a'],
}
const ORE: VoxelPalette = {
  top: ['#8b8b8b', '#8b8b8b', '#7b7b7b', '#9b9b9b', '#5ee7df'],
  side: ['#8b8b8b', '#8b8b8b', '#7b7b7b', '#9b9b9b', '#5ee7df'],
}

const hash = (i: number, j: number, seed: number) => ((i * 73856093) ^ (j * 19349663) ^ (seed * 83492791)) >>> 0

function Pixels({ colors, rim, grid, seed }: { colors: string[]; rim?: string[]; grid: number; seed: number }) {
  const cell = 1 / grid
  const rimRows = grid / 4
  const pixels: ReactNode[] = []
  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      const h = hash(i, j, seed)
      const palette = rim && (j < rimRows || (j === rimRows && h % 3 === 0)) ? rim : colors
      pixels.push(
        <rect key={`${i}-${j}`} x={i * cell} y={j * cell} width={cell + 0.01} height={cell + 0.01} fill={palette[h % palette.length]} />,
      )
    }
  }
  return <>{pixels}</>
}

function Voxel({ x, y, size, palette, grid = 4, seed = 1 }: { x: number; y: number; size: number; palette: VoxelPalette; grid?: number; seed?: number }) {
  const a = size * 0.866
  const h = size / 2
  const outline = `${x},${y - size} ${x + a},${y - h} ${x + a},${y + h} ${x},${y + size} ${x - a},${y + h} ${x - a},${y - h}`
  return (
    <g>
      <g transform={`matrix(${a} ${-h} ${a} ${h} ${x - a} ${y - h})`}>
        <Pixels colors={palette.top} grid={grid} seed={seed} />
      </g>
      <g transform={`matrix(${a} ${h} 0 ${size} ${x - a} ${y - h})`}>
        <Pixels colors={palette.side} rim={palette.rim} grid={grid} seed={seed + 1} />
        <rect width="1" height="1" fill="#000" fillOpacity="0.14" />
      </g>
      <g transform={`matrix(${a} ${-h} 0 ${size} ${x} ${y})`}>
        <Pixels colors={palette.side} rim={palette.rim} grid={grid} seed={seed + 2} />
        <rect width="1" height="1" fill="#000" fillOpacity="0.32" />
      </g>
      <polygon points={outline} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  )
}

const PARTICLES: Array<[x: number, y: number, size: number]> = [
  [262, 120, 4],
  [548, 96, 5],
  [236, 250, 3],
  [566, 232, 4],
  [318, 60, 3],
  [486, 350, 4],
  [300, 362, 3],
  [612, 180, 3],
  [180, 90, 3],
  [700, 250, 4],
]

function VoxelScene({ uid, accent }: SceneProps & { uid: string }) {
  const chat: Token[][] = [
    [[accent, 58], ['#fff', 118]],
    [['#facc15', 40], ['#fff', 96]],
    [[accent, 58], ['#fff', 140]],
  ]
  const hotbar = [GRASS, STONE, LOG, ORE]
  return (
    <>
      <defs>
        <filter id={`${uid}-halo`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <ellipse cx="400" cy="230" rx="170" ry="120" fill={accent} fillOpacity="0.2" filter={`url(#${uid}-halo)`} />

      {PARTICLES.map(([x, y, size], i) => (
        <rect key={i} x={x} y={y} width={size} height={size} fill={i % 3 ? '#fff' : accent} fillOpacity={i % 3 ? 0.35 : 0.8} />
      ))}

      <g className={styles.bob} style={{ animationDelay: '-1.4s' }}>
        <Voxel x={170} y={160} size={34} palette={STONE} seed={7} />
      </g>
      <g className={styles.bob} style={{ animationDelay: '-3.1s' }}>
        <Voxel x={640} y={128} size={30} palette={LOG} seed={11} />
      </g>
      <g className={styles.bob} style={{ animationDelay: '-4.2s' }}>
        <Voxel x={652} y={292} size={22} palette={ORE} seed={5} />
      </g>
      <g className={styles.bob}>
        <Voxel x={400} y={210} size={120} palette={GRASS} grid={8} seed={3} />
      </g>

      <g transform="translate(34 304)">
        {chat.map((tokens, i) => {
          let x = 8
          return (
            <g key={i} transform={`translate(0 ${i * 24})`}>
              <rect width="232" height="22" fill="#000" fillOpacity="0.45" />
              {tokens.map(([color, width], j) => {
                const rect = <rect key={j} x={x} y="7.5" width={width} height="7" rx="1" fill={color} fillOpacity="0.85" />
                x += width + 6
                return rect
              })}
            </g>
          )
        })}
      </g>

      <g transform="translate(204 410)">
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} transform={`translate(${i * 44} 0)`}>
            <rect
              width="40"
              height="40"
              fill="#000"
              fillOpacity="0.5"
              stroke={i === 0 ? accent : '#fff'}
              strokeOpacity={i === 0 ? 1 : 0.2}
              strokeWidth={i === 0 ? 3 : 1.5}
            />
            {hotbar[i] && <Voxel x={20} y={20} size={11} palette={hotbar[i]} seed={i + 2} />}
          </g>
        ))}
      </g>
    </>
  )
}
