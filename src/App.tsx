import { AppProvider } from '@/context/AppContext'
import { MotionProvider } from '@/context/MotionContext'
import { AnimatedRoutes } from '@/components/layout/AnimatedRoutes'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Background } from '@/components/effects/Background/Background'
import { Cursor } from '@/components/effects/Cursor/Cursor'
import { Preloader } from '@/components/effects/Preloader/Preloader'
import { ScrollProgress } from '@/components/effects/ScrollProgress/ScrollProgress'
import { CommandPalette } from '@/components/ui/CommandPalette/CommandPalette'
import { Toaster } from '@/components/ui/Toaster/Toaster'

export default function App() {
  return (
    <MotionProvider>
      <AppProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Background />
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <CommandPalette />
        <Toaster />
        <Cursor />
        <Preloader />
      </AppProvider>
    </MotionProvider>
  )
}
