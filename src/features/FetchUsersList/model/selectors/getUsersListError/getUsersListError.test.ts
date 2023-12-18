import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListError } from './getUsersListError'

describe('getUsersListError.test', () => {
  test('Simple getUsersListError.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        error: 'Test error',
      },
    }
    expect(getUsersListError(state as StateSchema)).toEqual('Test error')
  })

  test('getUsersListError.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListError(state as StateSchema)).toBeUndefined()
  })
})
