import * as prettier from "prettier"

import type { Code, Root } from "mdast"
import { visit } from "unist-util-visit"
import { prettierParser } from "./prettier-parser"

export const remarkFormatCode = () => {
  return async (tree: Root) => {
    const nodesToVisit: Code[] = []
    visit(tree, "code", (node: Code) => {
      nodesToVisit.push(node)
    })

    for (const node of nodesToVisit) {
      const parser = prettierParser(node.lang ?? undefined)
      if (parser && node.value) {
        try {
          const formattedCode = await prettier.format(node.value, {
            parser: parser,
            printWidth: 66,
            tabWidth: 2,
            semi: false,
            singleQuote: true,
          })
          node.value = formattedCode.trimEnd()
        } catch (error) {
          console.warn(
            `Prettier formatting failed for language "${node.lang}":`,
            error instanceof Error ? error.message : error
          )
          continue
        }
      }
    }
  }
}
