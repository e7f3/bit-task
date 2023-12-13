import { calculatePageNumber } from './calculatePageNumber'

describe('calculatePageNumber.test', () => {
  test('Without ... at all', () => {
    const totalPageCount = 5
    const visibleMiddlePageCount = 3
    const currentPage = 3
    const index = 1
    const hasLeftEllipsis = false
    const hasRightEllipsis = false

    const result = calculatePageNumber(
      totalPageCount,
      visibleMiddlePageCount,
      currentPage,
      index,
      hasLeftEllipsis,
      hasRightEllipsis,
    )
    expect(result).toEqual(3)
  })

  test('With ... at the left', () => {
    const totalPageCount = 6
    const visibleMiddlePageCount = 3
    const currentPage = 5
    const index = 2
    const hasLeftEllipsis = true
    const hasRightEllipsis = false

    const result = calculatePageNumber(
      totalPageCount,
      visibleMiddlePageCount,
      currentPage,
      index,
      hasLeftEllipsis,
      hasRightEllipsis,
    )
    expect(result).toEqual(5)
  })

  test('With ... at the right', () => {
    const totalPageCount = 6
    const visibleMiddlePageCount = 3
    const currentPage = 1
    const index = 0
    const hasLeftEllipsis = false
    const hasRightEllipsis = true

    const result = calculatePageNumber(
      totalPageCount,
      visibleMiddlePageCount,
      currentPage,
      index,
      hasLeftEllipsis,
      hasRightEllipsis,
    )
    expect(result).toEqual(2)
  })

  test('With ... at the left and right', () => {
    const totalPageCount = 9
    const visibleMiddlePageCount = 3
    const currentPage = 5
    const index = 1
    const hasLeftEllipsis = true
    const hasRightEllipsis = true

    const result = calculatePageNumber(
      totalPageCount,
      visibleMiddlePageCount,
      currentPage,
      index,
      hasLeftEllipsis,
      hasRightEllipsis,
    )
    expect(result).toEqual(5)
  })
})
