import { StateSchema } from 'app/providers/StoreProvider'

import { getUserBalance } from './getUserBalance'

describe('getUsersBalance.test', () => {
  test('Simple getUsersBalance.test', () => {
    const state : DeepPartial<StateSchema> = {
      userTransactions: {
        userBalance: 100,
      },
    }
    expect(getUserBalance(state as StateSchema)).toEqual(100)
  })

  test('getUsersBalance.test with undefined userBalance', () => {
    const state : DeepPartial<StateSchema> = {
      userTransactions: {
        userBalance: undefined,
      },
    }
    expect(getUserBalance(state as StateSchema)).toBeUndefined()
  })

  test('getUsersBalance.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUserBalance(state as StateSchema)).toBeUndefined()
  })
})
