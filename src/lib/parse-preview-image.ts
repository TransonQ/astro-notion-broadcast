import { getLinkPreview } from "link-preview-js"
import { get, isEmpty } from "lodash-es"

export async function parsePreviewImage(url?: string | null) {
  let preview = null
  if (url) {
    try {
      const linkPreview = await getLinkPreview(url)
      if (isEmpty(get(linkPreview, "images"))) {
        preview = null
      } else {
        preview = get(linkPreview, "images[0]") || null
      }
    } catch (error) {
      preview = null
    }
  }

  return preview
}
