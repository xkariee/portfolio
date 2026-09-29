import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/urbanist'
import '@fontsource-variable/jetbrains-mono'
import './styles/global.scss'
import { profile } from './data/profile'
import { applyMotionAttribute, readMotionPref, resolveReducedMotion } from './lib/motionPreference'
import App from './App'

history.scrollRestoration = 'manual'

applyMotionAttribute(resolveReducedMotion(readMotionPref()))

console.log(
  '%c👋 Hey, curious one!',
  'font: 700 16px system-ui; color: #6ff2d4',
  `\nLike what you see? Let's build something together → ${profile.email}`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
