import { buildAmountString } from './buildAmountString'

describe('buildAmountString.test', () => {
  test('Simple buildAmountString.test', () => {
    const amount = 1000
    const currency = 'RUB'
    const result = buildAmountString(amount, currency)
    expect(result).toEqual('1 000 RUB')
  })

  test('buildAmountString.test without currency', () => {
    const amount = 1000
    const result = buildAmountString(amount)
    expect(result).toEqual('1 000')
  })

  test('buildAmountString.test with float', () => {
    const amount = 1000.5
    const result = buildAmountString(amount)
    expect(result).toEqual('1 000.5')
  })

  test('buildAmountString.test with float and currency', () => {
    const amount = 1000.5
    const currency = 'RUB'
    const result = buildAmountString(amount, currency)
    expect(result).toEqual('1 000.5 RUB')
  })

  test('buildAmountString.test with small amount', () => {
    const amount = 999
    const currency = 'RUB'
    const result = buildAmountString(amount, currency)
    expect(result).toEqual('999 RUB')
  })
})
