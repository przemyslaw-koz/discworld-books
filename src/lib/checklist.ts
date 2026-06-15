import type { Book } from '@/db/schema'

export function calculateProgress(value: number, max: number): number {
  return max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
}

export function groupBooksByCycle(books: Book[]): {
  seriesOrder: string[]
  grouped: Record<string, Book[]>
} {
  const seriesOrder: string[] = []
  const grouped: Record<string, Book[]> = {}
  for (const book of books) {
    if (!grouped[book.cycle]) {
      seriesOrder.push(book.cycle)
      grouped[book.cycle] = []
    }
    grouped[book.cycle].push(book)
  }
  return { seriesOrder, grouped }
}

export function toggleSetItem<T>(set: Set<T>, item: T): Set<T> {
  const next = new Set(set)
  if (next.has(item)) next.delete(item)
  else next.add(item)
  return next
}
