import { createContext, useContext } from 'react'

export const TransitionLabelContext = createContext('')

export const useTransitionLabel = () => useContext(TransitionLabelContext)
