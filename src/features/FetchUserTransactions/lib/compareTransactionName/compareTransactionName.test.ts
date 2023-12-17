import { TransactionType } from 'entities/Transaction'

import { compareTransactionName } from './comparetransactionName'

describe('compareTransactionName.test', () => {
  test('Replenish', () => {
    expect(compareTransactionName(TransactionType.REPLENISH)).toEqual('Пополнение')
  })

  test('Write off', () => {
    expect(compareTransactionName(TransactionType.WRITE_OFF)).toEqual('Списание')
  })

  test('Subscription', () => {
    expect(compareTransactionName(TransactionType.SUBSCRIPTION)).toEqual('Подписка')
  })
})
