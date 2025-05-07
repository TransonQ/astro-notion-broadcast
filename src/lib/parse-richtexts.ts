import type { RichTextObject } from "../types/notion"

type Tag = "strong" | "em" | "u" | "del" | "code"
type Wrapper = [keyof RichTextObject["annotations"], Tag]

const wrappers: Wrapper[] = [
  ["bold", "strong"],
  ["italic", "em"],
  ["underline", "u"],
  ["strikethrough", "del"],
  ["code", "code"],
] as const

export const parseRichTexts = async (richtexts: RichTextObject[]): Promise<string> => {
  const md = richtexts.map((item) => {
    let txt = item.text?.content
    const ann = item.annotations
    wrappers.forEach(([key, tag]) => {
      if (ann[key]) {
        txt = `<${tag} class="richtext_${key}">${txt}</${tag}>`
      }
    })

    if (item.text?.link?.url) {
      txt = `<a class="richtext_link" href="${item.text.link.url}" target="_blank" rel="noopener noreferrer">${txt}</a>`
    }

    return txt
  })
  const str = md.join("")
  return str
}
