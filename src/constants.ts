import { parseNumber } from "./lib/tools"
const env = (typeof import.meta !== "undefined" && import.meta.env) || process.env

export const NOTION_API_KEY = env.NOTION_API_KEY
export const NOTION_DATABASE_ID = env.NOTION_DATABASE_ID

export const PAGE_SIZE = parseNumber(env.PAGE_SIZE, 20)

export const LABEL_CATEGORY = env.NAMED_PROPERTY_CATEGORIES || "Categories"
export const LABEL_TAGS = env.NAMED_PROPERTY_TAGS || "Tags"

export const SITE = {
  TITLE: env.SITE_TITLE || "Notion Broadcast",
  DESCRIPTION:
    env.SITE_DESCRIPTION || "Notion Broadcast is a simple and elegant Notion mini blog template.",
  COPYRIGHT: env.COPYRIGHT || "Notion Broadcast",
  EMAIL: env.EMAIL,
  GITHUB: env.GITHUB,
  TWITTER: env.TWITTER,
  YOUTUBE: env.YOUTUBE,
  INSTAGRAM: env.INSTAGRAM,
  FACEBOOK: env.FACEBOOK,
  TELEGRAM: env.TELEGRAM,
  DISCORD: env.DISCORD,
  LINKEDIN: env.LINKEDIN,
}

export const VERCEL_DEPLOY_HOOK = env.VERCEL_DEPLOY_HOOK
