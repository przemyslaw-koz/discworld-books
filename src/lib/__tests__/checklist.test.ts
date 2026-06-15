import { describe, it, expect } from 'vitest'
import { calculateProgress, groupBooksByCycle, toggleSetItem } from '../checklist'
import type { Book } from '@/db/schema'

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  id: 'book-1',
  title: 'The Colour of Magic',
  slug: 'the-colour-of-magic',
  cycle: 'Rincewind',
  sortOrder: 1,
  publishedYear: 1983,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  ...overrides,
})

describe('calculateProgress', () => {
  it('returns 0 when max is 0', () => {
    expect(calculateProgress(0, 0)).toBe(0)
  })

  it('returns 0 when value is 0', () => {
    expect(calculateProgress(0, 41)).toBe(0)
  })

  it('returns 100 when value equals max', () => {
    expect(calculateProgress(41, 41)).toBe(100)
  })

  it('clamps to 100 when value exceeds max', () => {
    expect(calculateProgress(50, 41)).toBe(100)
  })

  it('rounds to nearest integer', () => {
    expect(calculateProgress(1, 3)).toBe(33)
  })

  it('computes midpoint correctly', () => {
    expect(calculateProgress(20, 40)).toBe(50)
  })
})

describe('groupBooksByCycle', () => {
  it('returns empty groups for no books', () => {
    expect(groupBooksByCycle([])).toEqual({ seriesOrder: [], grouped: {} })
  })

  it('groups books by cycle in insertion order', () => {
    const books = [
      makeBook({ id: '1', cycle: 'Rincewind', sortOrder: 1 }),
      makeBook({ id: '2', cycle: 'Death', sortOrder: 2 }),
      makeBook({ id: '3', cycle: 'Rincewind', sortOrder: 3 }),
    ]
    const { seriesOrder, grouped } = groupBooksByCycle(books)
    expect(seriesOrder).toEqual(['Rincewind', 'Death'])
    expect(grouped['Rincewind']).toHaveLength(2)
    expect(grouped['Death']).toHaveLength(1)
  })

  it('preserves book order within a cycle', () => {
    const books = [
      makeBook({ id: '1', title: 'First', cycle: 'Rincewind', sortOrder: 1 }),
      makeBook({ id: '2', title: 'Second', slug: 'second', cycle: 'Rincewind', sortOrder: 2 }),
    ]
    const { grouped } = groupBooksByCycle(books)
    expect(grouped['Rincewind'].map((b) => b.title)).toEqual(['First', 'Second'])
  })
})

describe('toggleSetItem', () => {
  it('adds item when not present', () => {
    const result = toggleSetItem(new Set<string>(), 'a')
    expect(result.has('a')).toBe(true)
  })

  it('removes item when present', () => {
    const result = toggleSetItem(new Set(['a', 'b']), 'a')
    expect(result.has('a')).toBe(false)
    expect(result.has('b')).toBe(true)
  })

  it('returns a new Set instance', () => {
    const original = new Set(['a'])
    const result = toggleSetItem(original, 'b')
    expect(result).not.toBe(original)
  })

  it('does not mutate the original set', () => {
    const original = new Set(['a'])
    toggleSetItem(original, 'a')
    expect(original.has('a')).toBe(true)
  })
})
