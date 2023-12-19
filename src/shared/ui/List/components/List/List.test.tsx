import { fireEvent, render, screen } from '@testing-library/react'

import { List } from './List'
import { ListColumnTitle } from '../ListHead/ListHead'
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

const listColumnTitle: ListColumnTitle[] = [
  {
    id: '1',
    content: 'test1',
  },
  {
    id: '2',
    content: 'test2',
  },
  {
    id: '3',
    content: 'test3',
  },
]

describe('List.test', () => {
  test('Simple List.test', () => {
    render(<List elements={listElements} />)
    const list = screen.getByTestId('list')
    expect(list).toBeInTheDocument()
    expect(list).not.toBeEmptyDOMElement()
  })

  test('List.test colunm titles', () => {
    render(<List elements={listElements} columnTitles={listColumnTitle} />)
    const list = screen.getByTestId('list')
    const listHead = screen.getByTestId('list-head')
    expect(list).toBeInTheDocument()
    expect(listHead).toBeInTheDocument()
    expect(list).not.toBeEmptyDOMElement()
  })

  test('List.test empty list', () => {
    render(<List elements={[]} />)
    const list = screen.queryByTestId('list')
    expect(list).not.toBeInTheDocument()
    expect(list).toBeNull()
  })
})
