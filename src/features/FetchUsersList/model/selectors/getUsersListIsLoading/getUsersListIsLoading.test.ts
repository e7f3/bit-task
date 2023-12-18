import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListIsLoading } from './getUsersListIsLoading'

describe('getUsersListIsLoading.test', () => {
  test('Simple getUsersListIsLoading.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        isLoading: true,
      },
    }
    expect(getUsersListIsLoading(state as StateSchema)).toBeTruthy()
  })

  test('getUsersListIsLoading.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListIsLoading(state as StateSchema)).toBeFalsy()
  })
})
