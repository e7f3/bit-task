import { fireEvent, render, screen } from '@testing-library/react'

import { Input } from './Input'

describe('Input.test', () => {
  test('Simple Input.test', () => {
    render(<Input />)

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  test('Input.test change value', () => {
    render(<Input />)

    const input: HTMLInputElement = screen.getByTestId('input')
    fireEvent.change(input, { target: { value: '23' } })

    expect(input.value).toEqual('23')
  })
})
