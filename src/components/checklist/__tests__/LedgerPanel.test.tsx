import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LedgerPanel from '../LedgerPanel'
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

describe('LedgerPanel', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders book titles', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => {
      expect(screen.getByText('The Colour of Magic')).toBeInTheDocument()
    })
  })

  it('starts with all books unchecked', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => {
      expect(screen.getByAltText('Unchecked')).toBeInTheDocument()
    })
  })

  it('marks book as checked when clicked', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => screen.getByText('The Colour of Magic'))
    fireEvent.click(screen.getByText('The Colour of Magic'))
    expect(screen.getByAltText('Checked')).toBeInTheDocument()
  })

  it('unchecks book on second click', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => screen.getByText('The Colour of Magic'))
    fireEvent.click(screen.getByText('The Colour of Magic'))
    fireEvent.click(screen.getByText('The Colour of Magic'))
    expect(screen.getByAltText('Unchecked')).toBeInTheDocument()
  })

  it('persists checked state to localStorage', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => screen.getByText('The Colour of Magic'))
    fireEvent.click(screen.getByText('The Colour of Magic'))
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('discworld-checked-ids') ?? '[]') as string[]
      expect(stored).toContain('book-1')
    })
  })

  it('restores checked state from localStorage on mount', async () => {
    localStorage.setItem('discworld-checked-ids', JSON.stringify(['book-1']))
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => {
      expect(screen.getByAltText('Checked')).toBeInTheDocument()
    })
  })

  it('collapses series when header is clicked', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => screen.getByText('The Colour of Magic'))
    fireEvent.click(screen.getByText(/Rincewind/))
    expect(screen.queryByText('The Colour of Magic')).not.toBeInTheDocument()
  })

  it('shows initial progress counter', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => {
      expect(screen.getByText('0 / 1')).toBeInTheDocument()
    })
  })

  it('updates progress counter when book is checked', async () => {
    render(<LedgerPanel books={[makeBook()]} />)
    await waitFor(() => screen.getByText('0 / 1'))
    fireEvent.click(screen.getByText('The Colour of Magic'))
    expect(screen.getByText('1 / 1')).toBeInTheDocument()
  })
})
