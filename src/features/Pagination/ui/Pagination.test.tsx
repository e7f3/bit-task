import { fireEvent, screen } from '@testing-library/react'

import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { Pagination } from './Pagination'

const onPageChange = jest.fn()

describe('Pagination.test', () => {
  test('Simple Pagination.test', () => {
    componentRender(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')

    expect(pagination).toBeInTheDocument()
    // 5 pages and 2 arrows
    expect(pagination.children).toHaveLength(7)
  })

  test('Pagination.test with 1 page', () => {
    componentRender(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />)

    const pagination = screen.queryByTestId('pagination')

    expect(pagination).toBeNull()
  })

  test('Pagination.test with a lot of pages and left ellipsis', () => {
    componentRender(<Pagination currentPage={20} totalPages={20} visiblePages={3} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')

    expect(pagination).toBeInTheDocument()
    // left arrow, first page, ellipsis, three visible pages, last page and right arrow
    expect(pagination.children).toHaveLength(8)
  })

  test('Pagination.test with a lot of pages and right ellipsis', () => {
    componentRender(<Pagination currentPage={1} totalPages={20} visiblePages={3} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')

    expect(pagination).toBeInTheDocument()
    // left arrow, first page, three visible pages, ellipsis, last page and right arrow
    expect(pagination.children).toHaveLength(8)
  })

  test('Pagination.test with a lot of pages and both ellipsises', () => {
    componentRender(<Pagination currentPage={10} totalPages={20} visiblePages={3} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')

    expect(pagination).toBeInTheDocument()
    // left arrow, first page, ellipsis, three visible pages, ellipsis, last page and right arrow
    expect(pagination.children).toHaveLength(9)
  })

  test('Pagination.test with left arrow disabled', () => {
    componentRender(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const leftArrow = pagination.children[0]

    expect(pagination).toBeInTheDocument()
    expect(leftArrow).toHaveAttribute('disabled')
  })

  test('Pagination.test with right arrow disabled', () => {
    componentRender(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const rightArrow = pagination.children[6]

    expect(pagination).toBeInTheDocument()
    expect(rightArrow).toHaveAttribute('disabled')
  })

  test('Pagination.test left arrow click', () => {
    componentRender(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const leftArrow = pagination.children[0]

    expect(pagination).toBeInTheDocument()
    expect(leftArrow).not.toHaveAttribute('disabled')

    fireEvent.click(leftArrow)

    expect(onPageChange).toHaveBeenCalledTimes(1)
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  test('Pagination.test right arrow click', () => {
    componentRender(<Pagination currentPage={4} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const rightArrow = pagination.children[6]

    expect(pagination).toBeInTheDocument()
    expect(rightArrow).not.toHaveAttribute('disabled')

    fireEvent.click(rightArrow)

    expect(onPageChange).toHaveBeenCalledTimes(1)
    expect(onPageChange).toHaveBeenCalledWith(5)
  })

  test('Pagination.test first page click', () => {
    componentRender(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const firstPage = pagination.children[1]

    expect(pagination).toBeInTheDocument()
    expect(firstPage).not.toHaveAttribute('disabled')

    fireEvent.click(firstPage)

    expect(onPageChange).toHaveBeenCalledTimes(1)
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  test('Pagination.test last page click', () => {
    componentRender(<Pagination currentPage={4} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const lastPage = pagination.children[5]

    expect(pagination).toBeInTheDocument()
    expect(lastPage).not.toHaveAttribute('disabled')

    fireEvent.click(lastPage)

    expect(onPageChange).toHaveBeenCalledTimes(1)
    expect(onPageChange).toHaveBeenCalledWith(5)
  })

  test('Pagination.test middle page click', () => {
    componentRender(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const pagination = screen.getByTestId('pagination')
    const middlePage = pagination.children[3]

    expect(pagination).toBeInTheDocument()
    expect(middlePage).not.toHaveAttribute('disabled')

    fireEvent.click(middlePage)

    expect(onPageChange).toHaveBeenCalledTimes(1)
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
