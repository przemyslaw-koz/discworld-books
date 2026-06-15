import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressBlock from '../ProgressBlock'

describe('ProgressBlock', () => {
  it('displays checked and total count', () => {
    render(<ProgressBlock checked={10} total={41} />)
    expect(screen.getByText('10 / 41')).toBeInTheDocument()
  })

  it('displays 0 / 0 when no books', () => {
    render(<ProgressBlock checked={0} total={0} />)
    expect(screen.getByText('0 / 0')).toBeInTheDocument()
  })
})
