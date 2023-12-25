import { screen } from '@testing-library/react'

import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { Header } from './Header'

describe('Header.test', () => {
  test('Simple Header.test', () => {
    componentRender(<Header />)

    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })
})
