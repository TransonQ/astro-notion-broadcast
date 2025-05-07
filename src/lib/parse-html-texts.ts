import { transformerCopyButton } from "@rehype-pretty/transformers"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { remarkFormatCode } from "./remark-format-code"

export const parseHtmlTexts = async (s: string) => {
  const html = await unified()
    .use(remarkParse, { gfm: true })
    .use(remarkFormatCode)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "ayu-dark",
      defaultLang: "typescript",
      keepBackground: true,
      transformers: [
        transformerCopyButton({
          visibility: "hover",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(s)

  return html.toString()
}
