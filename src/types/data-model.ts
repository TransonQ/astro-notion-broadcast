import type { SelectProperty } from "./notion"

export interface DM_Database {
  title: string
  description: string
  icon: DM_File | DM_Emoji | null
  cover: DM_File | null
  /** custom props */
  tagOptions?: SelectProperty[] | null
  categoryOptions?: SelectProperty[] | null
}

export interface DM_Post {
  pageId: string
  icon: DM_File | DM_Emoji | null
  cover: DM_File | null
  createdTime: string
  lastEditedTime: string
  properties: {
    category: DM_Category | null
    tags: DM_Tag[] | null
    url: string | null
    content: string | null
    name: string | null
  }
  preview: string | null
}

export interface DM_File {
  type: string
  url: string
  expiry_time: string | null
}

export interface DM_Emoji {
  type: string
  emoji: string
}

export interface DM_Category {
  id: string
  name: string
  color: string
}

export interface DM_Tag {
  id: string
  name: string
  color: string
}
