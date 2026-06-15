import { sql } from 'drizzle-orm'
import { db } from './index'
import { books } from './schema'
import { discworldBooks } from '../data/discworldBooks'

const rows = discworldBooks.map((book) => ({
  id: book.id,
  title: book.title,
  slug: book.id,
  cycle: book.cycle,
  sortOrder: book.sortOrder,
  publishedYear: book.publishedYear,
}))

db.insert(books)
  .values(rows)
  .onConflictDoUpdate({
    target: books.id,
    set: {
      title: sql`excluded.title`,
      slug: sql`excluded.slug`,
      cycle: sql`excluded.cycle`,
      sortOrder: sql`excluded.sort_order`,
      publishedYear: sql`excluded.published_year`,
    },
  })
  .run()

console.log(`Seeded ${rows.length} books.`)
