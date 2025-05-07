import type { Emoji } from "./emoj"
import type { FileObject } from "./file"
import type { Equation, LinkPreview, RichTextObject } from "./paragraph"
import type { UserObject } from "./user"

// Block object
// https://developers.notion.com/reference/block
export interface BlockObject {
  object: string
  id: string
  created_time: string
  created_by: UserObject
  last_edited_by: UserObject
  has_children: boolean
  archived: boolean
  type: string

  paragraph?: Paragraph
  heading_1?: Heading
  heading_2?: Heading
  heading_3?: Heading
  callout?: Callout
  quote?: Quote
  bulleted_list_item?: ListItem
  numbered_list_item?: ListItem
  to_do?: ToDo
  toggle?: Toggle
  code?: Code
  child_page?: ChildPage
  child_database?: ChildDatabase
  embed?: Embed
  image?: FileBlock
  video?: FileBlock
  file?: FileBlock
  pdf?: FileBlock
  bookmark?: Bookmark
  equation?: Equation
  divider?: Record<string, never>
  table_of_contents?: TableOfContents
  breadcrumb?: Record<string, never>
  column_list?: Record<string, never>
  column?: Record<string, never>
  link_preview?: LinkPreview
  template?: Template
  link_to_page?: LinkToPage
  synced_block?: SyncedBlock
  table?: Table
  table_row?: TableRow
}

interface Paragraph {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

interface Heading {
  rich_text: RichTextObject[]
  color: string
  is_toggleable: boolean
}

interface Callout {
  rich_text: RichTextObject[]
  icon: FileObject | Emoji
  color: string
  children?: BlockObject[]
}

interface Quote {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

interface ListItem {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

interface ToDo {
  rich_text: RichTextObject[]
  checked: boolean
  color: string
  children?: BlockObject[]
}

interface Toggle {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

interface Code {
  rich_text: RichTextObject[]
  caption?: RichTextObject[]
  language: string
}

interface ChildPage {
  title: string
}

interface ChildDatabase {
  title: string
}

interface Embed {
  url: string
}

interface FileBlock extends FileObject {
  caption?: RichTextObject[]
}

interface Bookmark {
  url: string
  caption?: RichTextObject[]
}

interface TableOfContents {
  color: string
}

interface Template {
  rich_text: RichTextObject[]
  children?: BlockObject[]
}

interface LinkToPage {
  type: string
  page_id?: string
  database_id?: string
}

interface SyncedBlock {
  synced_from: null | SyncedFrom
  children?: BlockObject[]
}

interface SyncedFrom {
  type: string
  block_id: string
}

interface Table {
  table_width: number
  has_column_header: boolean
  has_row_header: boolean
  children?: BlockObject[]
}

interface TableRow {
  cells: RichTextObject[][]
}
