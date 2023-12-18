import { StateSchema } from 'app/providers/StoreProvider'

import { getUserTransactionsIsLoading } from './getUserTransactionsIsLoading'

describe('getUserTransactionsIsLoading.test', () => {
  test('Simple getUserTransactionsIsLoading.test', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        isLoading: true,
      },
    }
    expect(getUserTransactionsIsLoading(state as StateSchema)).toBeTruthy()
  })

  test('getUserTransactionsIsLoading.test with undefined isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        isLoading: undefined,
      },
    }
    expect(getUserTransactionsIsLoading(state as StateSchema)).toBeFalsy()
  })

  test('getUserTransactionsIsLoading.test with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getUserTransactionsIsLoading(state as StateSchema)).toBeFalsy()
  })
})
