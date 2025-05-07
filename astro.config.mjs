// @ts-check
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [],
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  redirects: {
    "/": "/1",
  },
})
