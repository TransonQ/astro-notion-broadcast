import { get } from "lodash-es"
import type { DM_Emoji, DM_File, DM_Post } from "../types/data-model"
import type { PageObject, RichTextObject } from "../types/notion"
import { parseHtmlTexts } from "./parse-html-texts"
import { parsePreviewImage } from "./parse-preview-image"
import { parseRichTexts } from "./parse-richtexts"

export async function parsePosts(data: PageObject[]): Promise<DM_Post[]> {
  return Promise.all(
    data.map(async (post) => {
      let icon: DM_File | DM_Emoji | null = null
      if (post.icon) {
        if (post.icon.type === "emoji" && "emoji" in post.icon) {
          icon = {
            type: post.icon.type,
            emoji: post.icon.emoji,
          }
        } else if (post.icon.type === "external" && "external" in post.icon) {
          icon = {
            type: post.icon.type,
            url: post.icon.external?.url || "",
            expiry_time: null,
          }
        }
      }

      let cover: DM_File | null = null
      if (post.cover) {
        cover = {
          type: post.cover.type,
          url: post.cover.external?.url || "",
          expiry_time: null,
        }
      }

      const createdTime = post.created_time
      const lastEditedTime = post.last_edited_time
      const originName = get(post, "properties.name.title", []) as RichTextObject[]
      const originSummary = get(post, "properties.content.rich_text", []) as RichTextObject[]
      const category = get(post, "properties.category.select", null)
      const tags = get(post, "properties.tags.multi_select", [])
      const url = get(post, "properties.url.url", null)

      const name = originName.map((item) => item.plain_text).join("")
      const summaryMdText = await parseRichTexts(originSummary)
      const content = await parseHtmlTexts(summaryMdText)
      const preview = await parsePreviewImage(url)

      return {
        pageId: post.id,
        icon,
        cover,
        createdTime,
        lastEditedTime,
        properties: {
          name,
          content,
          category,
          tags,
          url,
        },
        // custom
        preview,
      }
    })
  )
}
