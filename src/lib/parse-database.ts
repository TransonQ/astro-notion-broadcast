import { get, isEmpty } from "lodash-es"
import type { DM_Database } from "../types/data-model"
import type { RetrieveDatabaseResponse } from "../types/response"

export const parseDatabase = (data: RetrieveDatabaseResponse): DM_Database => {
  let icon: DM_Database["icon"] = null
  if (data.icon) {
    if (data.icon.type === "emoji" && "emoji" in data.icon) {
      icon = {
        type: data.icon.type,
        emoji: data.icon.emoji,
      }
    } else if (data.icon.type === "external" && "external" in data.icon) {
      icon = {
        type: data.icon.type,
        url: data.icon.external?.url || "",
        expiry_time: null,
      }
    } else if (data.icon.type === "file" && "file" in data.icon) {
      icon = {
        type: data.icon.type,
        url: data.icon.file?.url || "",
        expiry_time: null,
      }
    }
  }

  let cover: DM_Database["cover"] = null
  if (data.cover) {
    cover = {
      type: data.cover.type,
      url: data.cover.external?.url || data.cover?.file?.url || "",
      expiry_time: null,
    }
  }

  let categoryOptions: DM_Database["categoryOptions"] = null
  const propCategory = get(data, "properties.category.select.options", [])
  if (!isEmpty(propCategory)) {
    categoryOptions = propCategory
  }

  let tagOptions: DM_Database["tagOptions"] = null
  const propTag = get(data, "properties.tags.multi_select.options", [])
  if (!isEmpty(propTag)) {
    tagOptions = propTag
  }

  const database: DM_Database = {
    title: data.title.map((richText) => richText.plain_text).join(""),
    description: data.description.map((richText) => richText.plain_text).join(""),
    icon,
    cover,
    tagOptions,
    categoryOptions,
  }

  return database
}
