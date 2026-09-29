import type { Transition } from 'motion/react'

type Bezier = [number, number, number, number]

export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1]
export const EASE_OUT_EXPO: Bezier = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT: Bezier = [0.76, 0, 0.24, 1]

export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 34 }
export const springSoft: Transition = { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }
