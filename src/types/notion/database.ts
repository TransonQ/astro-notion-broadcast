import type { Emoji } from "./emoj"
import type { FileObject } from "./file"
import type { RichTextObject } from "./paragraph"
import type { Parent } from "./parent"
import type { UserObject } from "./user"

// Database object
// https://developers.notion.com/reference/database
export interface DatabaseObject {
  archived: boolean
  cover: FileObject
  created_by: UserObject
  created_time: string
  description: RichTextObject[]
  icon: FileObject | Emoji | null
  id: string
  is_inline: boolean
  last_edited_by: UserObject
  last_edited_time: string
  object: string
  parent: Parent
  properties: DatabaseProperties
  title: RichTextObject[]
  url: string
}

type DatabaseProperties = Record<string, DatabaseProperty>

interface DatabaseProperty {
  id: string
  type: string

  title?: Record<string, never>
  rich_text?: Record<string, never>
  number?: NumberConfiguration
  select?: SelectConfiguration
  status?: StatusConfiguration
  multi_select?: SelectConfiguration
  date?: Record<string, never>
  people?: Record<string, never>
  files?: Record<string, never>
  checkbox?: Record<string, never>
  url?: Record<string, never>
  email?: Record<string, never>
  phone_number?: Record<string, never>
  formula?: FormulaConfiguration
  relation?: RelationConfiguration
  rollup?: RollupConfiguration
  created_time?: Record<string, never>
  created_by?: Record<string, never>
  last_edited_time?: Record<string, never>
  last_edited_by?: Record<string, never>
}

interface NumberConfiguration {
  format: string
}

interface SelectConfiguration {
  options: SelectOptionObject[]
}

interface SelectOptionObject {
  name: string
  id: string
  color: string
}

interface StatusConfiguration {
  options: StatusOptionObject[]
  groups: StatusGroupObject[]
}

interface StatusOptionObject {
  name: string
  id: string
  color: string
}

interface StatusGroupObject {
  name: string
  id: string
  color: string
  option_ids: string[]
}

interface FormulaConfiguration {
  expression: string
}

interface RelationConfiguration {
  database_id: string
  type: string

  single_property?: Record<string, never>
  dual_property?: DualPropertyRelationConfiguration
}

interface DualPropertyRelationConfiguration {
  synced_property_name: string
  synced_property_id: string
}

interface RollupConfiguration {
  relation_property_name: string
  relation_property_id: string
  rollup_property_name: string
  rollup_property_id: string
  function: string
}
