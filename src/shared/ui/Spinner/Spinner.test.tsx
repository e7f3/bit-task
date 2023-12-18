import { render, screen } from '@testing-library/react'

import { Spinner } from './Spinner'

describe('Spinner.test', () => {
  test('Simple Spinner.test', () => {
    render(<Spinner />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
