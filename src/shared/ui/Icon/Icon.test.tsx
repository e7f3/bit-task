import { render, screen } from '@testing-library/react'

import { Icon } from './Icon'

const MockSVG = () => <svg data-testid='mock-svg' />;

describe('Icon.test', () => {
  test('Simple Icon.test', () => {
    render(<Icon className='test-class' icon={MockSVG} />)
    const icon = screen.getByTestId('mock-svg')
    expect(icon).toBeInTheDocument()
  })
})
