import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

const handleClick = jest.fn()

describe('Button.test', () => {
  test('Simple Button.test', () => {
    render(<Button>test</Button>)

    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
  })

  test('Button.test click', () => {
    render(<Button onClick={handleClick}>test</Button>)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
