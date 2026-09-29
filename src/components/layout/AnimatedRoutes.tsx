import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router'
import { TransitionLabelContext } from '@/context/TransitionContext'
import { getRouteLabel } from '@/lib/routes'
import { scrollToTop } from '@/lib/scroll'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

function onPageSwap() {
  scrollToTop(true)
  document.getElementById('main')?.focus({ preventScroll: true })
}

export function AnimatedRoutes() {
  const location = useLocation()

  return (
    <TransitionLabelContext value={getRouteLabel(location.pathname)}>
      <AnimatePresence mode="wait" initial={false} onExitComplete={onPageSwap}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </TransitionLabelContext>
  )
}
