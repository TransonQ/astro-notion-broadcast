import { APIResponseError, Client } from "@notionhq/client"
import retry from "async-retry"
import { LRUCache } from "lru-cache"
import { NOTION_API_KEY, NOTION_DATABASE_ID } from "../constants"
import { parseDatabase } from "../lib/parse-database"
import { parsePosts } from "../lib/parse-posts"
import type { DM_Database, DM_Post } from "../types/data-model"
import type { PageObject } from "../types/notion"
import type { QueryDatabase, RetrieveDatabase } from "../types/request-params"
import type { QueryDatabaseResponse, RetrieveDatabaseResponse } from "../types/response"

const RETRY_COUNT = 3
export type CacheKey = "db" | "posts"
export type CacheValue = DM_Database | DM_Post[]

const defaultTTL = 1000 * 60 * 5 // 5 minutes

const cache = new LRUCache<CacheKey, CacheValue>({
  max: 100,
  ttl: defaultTTL,
})

const client = new Client({
  auth: NOTION_API_KEY,
})

/**
 * Retrieve a database - columns and properties
 * @see https://developers.notion.com/reference/retrieve-a-database
 */
export const getDatabaseModel = async (): Promise<DM_Database> => {
  if (cache.has("db")) {
    const cachedValue = cache.get("db") as DM_Database
    return Promise.resolve(cachedValue)
  }

  const params: RetrieveDatabase = {
    database_id: NOTION_DATABASE_ID,
  }

  const response = await retry(
    async (bail) => {
      try {
        return (await client.databases.retrieve(params)) as RetrieveDatabaseResponse
      } catch (error: unknown) {
        if (error instanceof APIResponseError) {
          if (error.status && error.status >= 400 && error.status < 500) {
            bail(error)
          }
        }
        throw error
      }
    },
    {
      retries: RETRY_COUNT,
    }
  )

  const database = parseDatabase(response)
  cache.set("db", database)

  return database
}

/**
 * Retrieve all posts from the database
 */
export const getDatabaseAllPosts = async (): Promise<DM_Post[]> => {
  if (cache.has("posts")) {
    return Promise.resolve(cache.get("posts") as DM_Post[])
  }

  const params: QueryDatabase = {
    database_id: NOTION_DATABASE_ID,
    page_size: 100,
    sorts: [
      {
        property: "created_at",
        direction: "descending",
      },
    ],
  }
  let results: PageObject[] = []
  while (true) {
    const res = await retry(
      async (bail) => {
        try {
          return (await client.databases.query(params as any)) as QueryDatabaseResponse
        } catch (error: unknown) {
          if (error instanceof APIResponseError) {
            if (error.status && error.status >= 400 && error.status < 500) {
              bail(error)
            }
          }
          throw error
        }
      },
      {
        retries: RETRY_COUNT,
      }
    )

    results = results.concat(res.results)

    if (!res.has_more) {
      break
    }
    params["start_cursor"] = res.next_cursor as string
  }

  const posts = await parsePosts(results)
  cache.set("posts", posts)
  return posts
}

export const getDatabaseMeta = async () => {
  const data = await getDatabaseModel()
  const icon = data.icon
  const cover = data.cover
  const title = data.title
  const description = data.description
  const tags = data.tagOptions?.map((tag) => tag.name) ?? []
  const categories = data.categoryOptions?.map((category) => category.name) ?? []
  return {
    icon,
    cover,
    title,
    description,
    categories,
    tags,
  }
}
