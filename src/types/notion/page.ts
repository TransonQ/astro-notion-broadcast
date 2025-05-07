// Page object

import type { Emoji } from "./emoj"
import type { FileObject } from "./file"
import type { DateProperty, RichTextObject } from "./paragraph"
import type { Parent } from "./parent"
import type { UserObject } from "./user"

// https://developers.notion.com/reference/page
export interface PageObject {
  object: string
  id: string
  created_time: string // 2025-04-20T15:30:00.000Z
  created_by: UserObject // { object: 'user', id: '13fe1813-d387-41b2-bc2c-eded2b9a2266' }
  last_edited_time: string
  last_edited_by: UserObject
  archived: boolean
  icon: FileObject | Emoji | null
  cover: FileObject
  properties: PageProperties
  parent: Parent
  url: string
}

type PageProperties = Record<string, PageProperty>

interface PageProperty {
  id: string
  type: string

  title?: RichTextObject[]
  rich_text?: RichTextObject[]
  number?: number
  select?: SelectProperty
  status?: StatusProperty
  multi_select?: SelectProperty[]
  date?: DateProperty
  formula?: FormulaProperty
  relation?: RelationProperty[]
  rollup?: RollupProperty
  people?: UserObject[]
  files?: FileObject[]
  checkbox?: boolean
  url?: string
  email?: string
  phone_number?: string
  created_time?: string
  created_by?: UserObject
  last_edited_time?: string
  last_edited_by?: UserObject
}

export interface SelectProperty {
  id: string
  name: string
  color: string
}

export interface StatusProperty {
  id: string
  name: string
  color: string
}

export interface FormulaProperty {
  type: string

  number?: number
  string?: string
  boolean?: boolean
  date?: DateProperty
}

interface RelationProperty {
  id: string
}

interface RollupProperty {
  type: string
  function: string

  number?: number
  string?: string
  date?: DateProperty
  results?: string[]
}
