import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProgressBar from '../ProgressBar'

const getFill = (container: HTMLElement) =>
  container.querySelector('div > div > div') as HTMLElement

describe('ProgressBar', () => {
  it('renders with 0% width when max is 0', () => {
    const { container } = render(<ProgressBar value={0} max={0} />)
    expect(getFill(container).style.width).toBe('0%')
  })

  it('renders with 50% width for half progress', () => {
    const { container } = render(<ProgressBar value={20} max={40} />)
    expect(getFill(container).style.width).toBe('50%')
  })

  it('clamps to 100% when value exceeds max', () => {
    const { container } = render(<ProgressBar value={50} max={10} />)
    expect(getFill(container).style.width).toBe('100%')
  })
})
