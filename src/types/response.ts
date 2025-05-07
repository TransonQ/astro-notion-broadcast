// Query a database response

import type { BlockObject, DatabaseObject, PageObject } from "./notion"

// https://developers.notion.com/reference/post-database-query
export interface QueryDatabaseResponse {
  object: string
  results: PageObject[]
  next_cursor: null | string
  has_more: boolean
  type: string
  page?: Record<string, never>
}

// Retrieve a database response
// https://developers.notion.com/reference/retrieve-a-database
export type RetrieveDatabaseResponse = DatabaseObject

// Retrieve a block response
// https://developers.notion.com/reference/retrieve-a-block
export type RetrieveBlockResponse = BlockObject

// Retrieve block children response
// https://developers.notion.com/reference/get-block-children
export interface RetrieveBlockChildrenResponse {
  object: string
  results: BlockObject[]
  next_cursor: null | string
  has_more: boolean
  type: string
  block?: Record<string, never>
}
