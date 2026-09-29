import { useEffect, useMemo, useState } from 'react'

export function useLocalTime(timeZone: string, { seconds = false } = {}) {
  const timeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: seconds ? '2-digit' : undefined,
        hour12: false,
      }),
    [timeZone, seconds],
  )
  const zoneFormat = useMemo(() => new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' }), [timeZone])

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), seconds ? 1000 : 5000)
    return () => window.clearInterval(id)
  }, [seconds])

  const zone = zoneFormat.formatToParts(now).find((part) => part.type === 'timeZoneName')?.value ?? ''
  return { time: timeFormat.format(now), zone }
}
