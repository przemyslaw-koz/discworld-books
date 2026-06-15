import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import * as authSchema from './auth-schema'

const url = process.env.DATABASE_URL ?? 'file:./local.db'
const sqlite = new Database(url.replace(/^file:/, ''))

export const db = drizzle(sqlite, { schema: { ...schema, ...authSchema } })
