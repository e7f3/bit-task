import { StateSchema } from 'app/providers/StoreProvider'

import { getUserTransactionsError } from './getUserTransactionsError'

describe('getUserTransactionsError.test', () => {
  test('Simple getUserTransactionsError.test', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        error: 'Test',
      },
    }
    expect(getUserTransactionsError(state as StateSchema)).toEqual('Test')
  })

  test('getUserTransactionsError.test with undefined error', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        error: undefined,
      },
    }
    expect(getUserTransactionsError(state as StateSchema)).toBeUndefined()
  })

  test('getUserTransactionsError.test with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getUserTransactionsError(state as StateSchema)).toBeUndefined()
  })
})
