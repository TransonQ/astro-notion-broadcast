import type { Page } from "astro";

export function parsePaginateUrl(astroPage?: Page): { prefix: string; totalPages: number } {
  const path = astroPage?.url.current
  const totalPages = astroPage?.lastPage ?? 1

  if (!path) {
    return { prefix: "/", totalPages: 1 }
  }
  const lastSlashIndex = path.lastIndexOf("/")
  const prefix = path.substring(0, lastSlashIndex + 1)

  return { prefix, totalPages }
}
