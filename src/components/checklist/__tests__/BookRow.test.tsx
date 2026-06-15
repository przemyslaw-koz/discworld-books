import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BookRow from '../BookRow'

const defaultProps = {
  index: 1,
  title: 'The Colour of Magic',
  year: 1983,
  checked: false,
  onToggle: vi.fn(),
}

describe('BookRow', () => {
  it('renders book title, index, and year', () => {
    render(<BookRow {...defaultProps} />)
    expect(screen.getByText('The Colour of Magic')).toBeInTheDocument()
    expect(screen.getByText('1.')).toBeInTheDocument()
    expect(screen.getByText('1983')).toBeInTheDocument()
  })

  it('shows unchecked checkbox when checked is false', () => {
    render(<BookRow {...defaultProps} checked={false} />)
    expect(screen.getByAltText('Unchecked')).toBeInTheDocument()
  })

  it('shows checked checkbox when checked is true', () => {
    render(<BookRow {...defaultProps} checked={true} />)
    expect(screen.getByAltText('Checked')).toBeInTheDocument()
  })

  it('calls onToggle when row is clicked', () => {
    const onToggle = vi.fn()
    render(<BookRow {...defaultProps} onToggle={onToggle} />)
    fireEvent.click(screen.getByText('The Colour of Magic'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
