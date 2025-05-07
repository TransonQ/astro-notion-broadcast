import type { DM_Post } from "../types/data-model"
import { isDMEmoji, isDMFile } from "./type-check"

export const parseIcon = (icon: DM_Post["icon"]) => {
  return {
    emoji: isDMEmoji(icon) ? icon.emoji : null,
    url: isDMFile(icon) ? icon.url : null,
  }
}
