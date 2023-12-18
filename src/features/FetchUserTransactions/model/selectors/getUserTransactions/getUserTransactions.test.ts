import { StateSchema } from 'app/providers/StoreProvider'

import { getUserTransactions } from './getUserTransactions'

describe('getUserTransactions.test', () => {
  test('getUserTransactions.test get all transactions', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        ids: ['1', '2', '3'],
        entities: {
          1: {
            id: '1',
            amount: 100,
          },
          2: {
            id: '2',
            amount: 200,
          },
          3: {
            id: '3',
            amount: 300,
          },
        },
      },
    }
    expect(getUserTransactions.selectTotal(state as StateSchema)).toEqual(3)
    expect(getUserTransactions.selectAll(state as StateSchema)).toEqual([
      {
        id: '1',
        amount: 100,
      },
      {
        id: '2',
        amount: 200,
      },
      {
        id: '3',
        amount: 300,
      },
    ])
  })

  test('getUserTransactions.test get transaction by id', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        ids: ['1', '2', '3'],
        entities: {
          1: {
            id: '1',
            amount: 100,
          },
          2: {
            id: '2',
            amount: 200,
          },
          3: {
            id: '3',
            amount: 300,
          },
        },
      },
    }
    expect(getUserTransactions.selectById(state as StateSchema, '1')).toEqual({
      id: '1',
      amount: 100,
    })
  })

  test('getUserTransactions.test with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getUserTransactions.selectAll(state as StateSchema)).toEqual([])
  })
})
