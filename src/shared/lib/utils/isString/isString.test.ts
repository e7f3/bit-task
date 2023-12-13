import { isString } from './isString'

describe('isString.test', () => {
  test('isString.test with string', () => {
    expect(isString('test')).toBeTruthy()
  })

  test('isString.test with number', () => {
    expect(isString(1)).toBeFalsy()
  })

  test('isString.test with boolean', () => {
    expect(isString(true)).toBeFalsy()
  })

  test('isString.test with object', () => {
    expect(isString({})).toBeFalsy()
  })

  test('isString.test with array', () => {
    expect(isString([])).toBeFalsy()
  })
})
