import { fireEvent, screen } from '@testing-library/react'

import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { Search } from './Search'

const onChange = jest.fn()

describe('Search.test', () => {
  test('Simple Search.test', () => {
    componentRender(<Search value='' onChange={onChange} />, {
      initialState: {
        usersList: {
          search: '',
        },
      },
    })
    const search = screen.getByTestId('input')
    fireEvent.change(search, { target: { value: 'test' } })

    expect(search).toBeInTheDocument()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('test')
  })
})
