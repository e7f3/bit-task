import { fireEvent, render, screen } from '@testing-library/react'

import { Input } from './Input'

const InputBadge = () => <svg data-testid='input-badge' />

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

  test('Input.test check label appearance', () => {
    render(<Input label='test' />)

    expect(screen.getByTestId('input-label')).toBeInTheDocument()
  })

  test('Input.test check error appearance', () => {
    render(<Input errorText='test' hasError />)

    const error = screen.getByTestId('input-error')

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('test')
  })

  test('Input.test check badge appearance', () => {
    render(<Input badge={InputBadge} />)

    expect(screen.getByTestId('input-badge')).toBeInTheDocument()
  })
})
