import { calculateArrayLength } from './calculateArrayLength'

describe('calculateArrayLength.test', () => {
  test('visibleMiddlePageCount is greather than totalPageCount minus first and last pages', () => {
    const visibleMiddlePageCount = 5
    const totalPageCount = 5

    const result = calculateArrayLength(visibleMiddlePageCount, totalPageCount)
    expect(result).toEqual(3)
  })

  test('visibleMiddlePageCount is less than totalPageCount minus first and last pages', () => {
    const visibleMiddlePageCount = 2
    const totalPageCount = 5

    const result = calculateArrayLength(visibleMiddlePageCount, totalPageCount)
    expect(result).toEqual(2)
  })
})
