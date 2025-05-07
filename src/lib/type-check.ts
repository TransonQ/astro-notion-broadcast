import type { DM_Emoji, DM_File } from "../types/data-model"

export function isDMFile(obj: any): obj is DM_File {
  return (
    obj !== null && typeof obj === "object" && typeof obj.type === "string" && typeof obj.url === "string"
  )
}

export function isDMEmoji(obj: any): obj is DM_Emoji {
  return !!obj && typeof obj === "object" && obj.type === "emoji" && typeof obj.emoji === "string"
}
