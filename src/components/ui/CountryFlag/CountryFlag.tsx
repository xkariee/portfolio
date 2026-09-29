import styles from './CountryFlag.module.scss'

export function CountryFlag({ code }: { code: string }) {
  const upper = code.toUpperCase()

  if (upper === 'PL') {
    return (
      <span className={styles.flag} aria-hidden="true">
        <svg viewBox="0 0 16 10" width="20" height="13">
          <rect width="16" height="5" fill="#ffffff" />
          <rect y="5" width="16" height="5" fill="#dc143c" />
        </svg>
      </span>
    )
  }

  const emoji = upper.replace(/[A-Z]/g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
  return <span aria-hidden="true">{emoji}</span>
}
