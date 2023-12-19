import { render, screen } from '@testing-library/react'

import { ListColumnTitle, ListHead } from './ListHead'

const colmnTitles: ListColumnTitle[] = [
  {
    id: '1',
    content: 'test',
  },
  {
    id: '2',
    content: 'test',
  },
]

describe('ListHead.test', () => {
  test('Simple ListHead.test', () => {
    render(<ListHead columnTitles={colmnTitles} />)
    const listHead = screen.getByTestId('list-head')

    expect(listHead).toBeInTheDocument()
  })

  test('ListHead.test with controls', () => {
    render(<ListHead columnTitles={colmnTitles} hasControls />)
    const listHead = screen.getByTestId('list-head')
    const listHeadControls = screen.queryByTestId('list-head-controls')

    expect(listHead).toBeInTheDocument()
    expect(listHead).toContainElement(listHeadControls)
  })

  test('ListHead.test empty list', () => {
    render(<ListHead columnTitles={[]} />)
    const listHead = screen.getByTestId('list-head')

    expect(listHead).toBeInTheDocument()
    expect(listHead).toBeEmptyDOMElement()
  })
})
