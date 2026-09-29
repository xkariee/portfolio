import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { TbCheck, TbLoader2, TbSend } from 'react-icons/tb'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'
import { springSnappy } from '@/lib/motion'
import { trackPointer } from '@/lib/pointer'
import { toast } from '@/lib/toast'
import { Button } from '@/components/ui/Button/Button'
import styles from './ContactForm.module.scss'

const TOPICS = ['Website', 'Web app', 'UI / Motion', 'Something else'] as const

type Field = 'name' | 'email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent'

const EMPTY: Values = { name: '', email: '', message: '' }

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please tell me your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'That email doesn’t look right.'
  if (values.message.trim().length < 10) errors.message = 'A few more words, please (min. 10 characters).'
  return errors
}

export function ContactForm() {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(EMPTY)
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0])
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Field[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`[${topic}] Hello from ${values.name.trim()}`)
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      toast('Opening your email app…')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, topic }),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('sent')
      setValues(EMPTY)
      toast('Message sent — talk soon!', 'success')
      window.setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('idle')
      toast('Something went wrong. Please email me directly.', 'error')
    }
  }

  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    onChange,
    placeholder: ' ',
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
    className: styles.input,
  })

  const renderError = (field: Field) => (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          id={`${id}-${field}-error`}
          className={styles.error}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
        >
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} onPointerMove={trackPointer} noValidate>
      <fieldset className={styles.topics}>
        <legend className={styles.legend}>What can I help you with?</legend>
        <div className={styles.topicList}>
          {TOPICS.map((t) => {
            const active = topic === t
            return (
              <label key={t} className={cn(styles.topic, active && styles.topicActive)}>
                <input
                  type="radio"
                  name="topic"
                  value={t}
                  checked={active}
                  onChange={() => setTopic(t)}
                  className="sr-only"
                />
                {active && <motion.span layoutId="topic-pill" className={styles.topicPill} transition={springSnappy} />}
                {t}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <input type="text" autoComplete="name" {...fieldProps('name')} />
          <label htmlFor={`${id}-name`} className={styles.label}>
            Your name
          </label>
          {renderError('name')}
        </div>
        <div className={styles.field}>
          <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
          <label htmlFor={`${id}-email`} className={styles.label}>
            Email address
          </label>
          {renderError('email')}
        </div>
      </div>

      <div className={styles.field}>
        <textarea rows={5} {...fieldProps('message')} />
        <label htmlFor={`${id}-message`} className={styles.label}>
          Tell me about your project
        </label>
        {renderError('message')}
      </div>

      <div className={styles.actions}>
        <p className={styles.note}>I usually reply within 24 hours.</p>
        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={status === 'sending'}
          icon={status === 'sending' ? <TbLoader2 className={styles.spin} /> : status === 'sent' ? <TbCheck /> : <TbSend />}
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
