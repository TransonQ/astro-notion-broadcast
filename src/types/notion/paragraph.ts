import type { BlockObject } from "./block"
import type { UserObject } from "./user"

export interface Paragraph {
  rich_text: RichTextObject[]
  color: string
  children?: BlockObject[]
}

export interface RichTextObject {
  type: string
  plain_text: string
  annotations: Annotations
  href?: string

  text?: Text
  mention?: Mention
  equation?: Equation
}

export interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

interface Text {
  content: string
  link?: Link
}

interface Link {
  type: string
  url: string
}

interface Mention {
  type: string

  user?: UserObject
  page?: Reference
  database?: Reference
  date?: DateProperty
  link_preview?: LinkPreview
}

interface Reference {
  id: string
}

export interface DateProperty {
  start: string
  end?: null | string
  timezone?: null | string
}

export interface LinkPreview {
  url: string
}

export interface Equation {
  expression: string
}
