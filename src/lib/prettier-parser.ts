import * as prettier from "prettier"
// Mapping from common language identifiers to Prettier parser names
// See https://prettier.io/docs/en/options.html#parser
const langToParserMap: Record<string, prettier.BuiltInParserName> = {
  // JavaScript variations (using babel parser)
  js: "babel",
  javascript: "babel",
  mjs: "babel",
  cjs: "babel",
  jsx: "babel",
  // Flow (using flow parser)
  flow: "flow",
  // TypeScript variations (using typescript parser)
  ts: "typescript",
  typescript: "typescript",
  mts: "typescript",
  cts: "typescript",
  tsx: "typescript",
  // CSS variations
  css: "css",
  scss: "scss",
  less: "less",
  // JSON variations
  json: "json",
  jsonc: "json", // Often formatted using the 'json' parser
  json5: "json5",
  // GraphQL
  graphql: "graphql",
  gql: "graphql",
  // Markdown variations
  md: "markdown",
  markdown: "markdown",
  mdx: "mdx",
  // HTML variations
  html: "html",
  htm: "html",
  // Vue
  vue: "vue",
  // Angular (uses 'angular' parser, often for templates)
  // Note: Angular component code itself is usually 'typescript'
  // angular: "angular", // Uncomment if needed, might conflict with html/ts detection
  // LWC (uses 'lwc' parser, similar to html)
  // lwc: "lwc", // Uncomment if needed
  // YAML variations
  yaml: "yaml",
  yml: "yaml",
  // Handlebars (uses glimmer parser)
  hbs: "glimmer",
  handlebars: "glimmer",
  // Glimmer (Ember)
  gjs: "glimmer",
  gts: "glimmer",
  // Add other mappings if needed based on Prettier plugins or future built-ins
}

export const prettierParser = (lang?: string): prettier.BuiltInParserName | null => {
  if (!lang) {
    // Default to babel for unspecified language, assuming JavaScript commonality
    return "babel"
  }

  const lowerLang = lang.toLowerCase()
  const parser = langToParserMap[lowerLang]

  if (parser) {
    return parser
  }

  return null
}
