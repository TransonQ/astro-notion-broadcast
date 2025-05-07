import type { DM_Database } from "../types/data-model"
import { parseIcon } from "./parse-icon"

export const parseFavicon = (initFavicon: string, icon: DM_Database["icon"]) => {
  const { url, emoji } = parseIcon(icon)
  let favicon = initFavicon

  if (emoji) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`
    const dataUri = `data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}`
    favicon = dataUri
  } else if (url) {
    favicon = url
  }

  return favicon
}
