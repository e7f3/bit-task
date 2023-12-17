import { buildDateString } from './buildDateString'

describe('buildDateString.test', () => {
  test('Simple buildDateString.test', () => {
    // I have +4 timezone
    const date = new Date(0)
    const result = buildDateString(date)
    const expected = '01.01.70, 04:00:00'
    expect(result).toEqual(expected)
  })
})
