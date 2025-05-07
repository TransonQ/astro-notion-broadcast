import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", ".astro"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {},
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: ".*",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
)
