import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BookList from '../BookList'
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

const defaultProps = {
  checkedIds: new Set<string>(),
  onToggle: vi.fn(),
  collapsedSeries: new Set<string>(),
  onToggleSeries: vi.fn(),
}

describe('BookList', () => {
  it('renders series headers', () => {
    const books = [
      makeBook({ id: '1', cycle: 'Rincewind' }),
      makeBook({ id: '2', cycle: 'Death', title: 'Mort', slug: 'mort', sortOrder: 2 }),
    ]
    render(<BookList books={books} {...defaultProps} />)
    expect(screen.getByText(/Rincewind/)).toBeInTheDocument()
    expect(screen.getByText(/Death/)).toBeInTheDocument()
  })

  it('renders books when series is not collapsed', () => {
    const books = [makeBook()]
    render(<BookList books={books} {...defaultProps} />)
    expect(screen.getByText('The Colour of Magic')).toBeInTheDocument()
  })

  it('hides books when series is collapsed', () => {
    const books = [makeBook()]
    render(<BookList books={books} {...defaultProps} collapsedSeries={new Set(['Rincewind'])} />)
    expect(screen.queryByText('The Colour of Magic')).not.toBeInTheDocument()
  })

  it('shows book count in series header', () => {
    const books = [
      makeBook({ id: '1' }),
      makeBook({ id: '2', title: 'The Light Fantastic', slug: 'light-fantastic', sortOrder: 2 }),
    ]
    render(<BookList books={books} {...defaultProps} />)
    expect(screen.getByText(/Rincewind \(2\)/)).toBeInTheDocument()
  })

  it('calls onToggleSeries when series header is clicked', () => {
    const onToggleSeries = vi.fn()
    const books = [makeBook()]
    render(<BookList books={books} {...defaultProps} onToggleSeries={onToggleSeries} />)
    fireEvent.click(screen.getByText(/Rincewind/))
    expect(onToggleSeries).toHaveBeenCalledWith('Rincewind')
  })
})
