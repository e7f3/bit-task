import { fireEvent, render, screen } from '@testing-library/react'

import { ListElement, ListElementMarking, ListItem } from './ListItem'

const listElement: ListElement = {
  id: '1',
  content: [
    {
      value: 'test2',
      marking: ListElementMarking.SUCCESS,
    },
  ],
}

const handleClick = jest.fn()

describe('ListItem.test', () => {
  test('Simple ListItem.test', () => {
    render(<ListItem element={listElement} />)

    const listItem = screen.getByTestId('list-item')
    expect(listItem).toBeInTheDocument()
  })

  test('ListItem.test content with marking', () => {
    render(<ListItem element={listElement} />)

    const listItem = screen.getByTestId('list-item')
    const listItemText = screen.getByTestId('text')
    expect(listItem).toBeInTheDocument()
    expect(listItemText).toHaveClass('success')
  })

  test('ListItem.test click', () => {
    render(<ListItem element={listElement} onClick={handleClick} />)

    const listItem = screen.getByTestId('list-item')
    fireEvent.click(listItem)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('ListItem.test without content', () => {
    render(<ListItem element={{ id: '1', content: [] }} />)

    const listItem = screen.getByTestId('list-item')
    expect(listItem).toBeInTheDocument()
    expect(listItem).toBeEmptyDOMElement()
  })

  test('ListItem.test with controls', () => {
    render(<ListItem element={listElement} hasControls />)

    const listItem = screen.getByTestId('list-item')
    const listItemControls = screen.queryByTestId('list-item-controls')

    expect(listItem).toBeInTheDocument()
    expect(listItem).toContainElement(listItemControls)
  })
})
