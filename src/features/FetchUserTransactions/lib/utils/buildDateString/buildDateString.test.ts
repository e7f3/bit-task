import { buildDateString } from './buildDateString'

describe('buildDateString.test', () => {
  test('Simple buildDateString.test', () => {
    // I have +4 timezone
    const date = new Date(0)
    const result = buildDateString(date)
    const expected = '01.01.70, 04:00:00'
    expect(result).toEqual(expected)
  })

  test('buildDateString.test with format "xshort"', () => {
    // I have +4 timezone
    const date = new Date(0)
    const result = buildDateString(date, 'xshort')
    const expected = '1970-01'
    expect(result).toEqual(expected)
  })

  test('buildDateString.test with format "short"', () => {
    // I have +4 timezone
    const date = new Date(0)
    const result = buildDateString(date, 'short')
    const expected = '01 янв. 1970 г.'
    expect(result).toEqual(expected)
  })
})
