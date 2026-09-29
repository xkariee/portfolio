export type ToastTone = 'default' | 'success' | 'error'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface Toast {
  id: number
  message: string
  tone: ToastTone
  action?: ToastAction
}

interface ToastOptions {
  duration?: number
  action?: ToastAction
}

let toasts: Toast[] = []
let nextId = 1
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((listener) => listener())

export function toast(message: string, tone: ToastTone = 'default', { duration = 2800, action }: ToastOptions = {}) {
  const id = nextId++
  toasts = [...toasts.slice(-2), { id, message, tone, action }]
  emit()
  window.setTimeout(() => dismissToast(id), duration)
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export function subscribeToasts(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getToasts = () => toasts
