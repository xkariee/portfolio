import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { TbAlertCircle, TbCircleCheck, TbSparkles } from 'react-icons/tb'
import { dismissToast, getToasts, subscribeToasts } from '@/lib/toast'
import { springSoft } from '@/lib/motion'
import { cn } from '@/lib/cn'
import styles from './Toaster.module.scss'

const ICONS = { default: TbSparkles, success: TbCircleCheck, error: TbAlertCircle }

export function Toaster() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)

  return (
    <div className={styles.region} role="status" aria-live="polite">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = ICONS[t.tone]
          return (
            <motion.div
              key={t.id}
              layout
              className={cn(styles.toast, styles[t.tone])}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={springSoft}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              {t.message}
              {t.action && (
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => {
                    t.action?.onClick()
                    dismissToast(t.id)
                  }}
                >
                  {t.action.label}
                </button>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
