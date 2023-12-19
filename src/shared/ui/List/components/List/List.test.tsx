import { render, screen } from '@testing-library/react'

import { List } from './List'
import { ListElement } from '../ListItem/ListItem'

const listElements: ListElement[] = [
  {
    id: '1',
    content: [
      {
        value: 'test1',
      },
    ],
  },
  {
    id: '2',
    content: [
      {
        value: 'test2',
      },
    ],
  },
  {
    id: '3',
    content: [
      {
        value: 'test3',
      },
    ],
  },
]

const handleClick = jest.fn()

describe('List.test', () => {
  test('Simple List.test', () => {
    render(<List elements={listElements} />)
    const list = screen.getByTestId('list')
    expect(list).toBeInTheDocument()
  })
})
