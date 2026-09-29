export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}
