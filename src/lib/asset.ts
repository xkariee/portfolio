// Prefixes a /public path with Vite's base, so it resolves under /portfolio/ on GitHub Pages
export function asset(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
