import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListSearch } from './getUsersListSearch'

describe('getUsersListSearch.test', () => {
  test('Simple getUsersListSearch.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        search: 'Test',
      },
    }
    expect(getUsersListSearch(state as StateSchema)).toEqual('Test')
  })

  test('getUsersListSearch.test with undefined search', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        search: undefined,
      },
    }
    expect(getUsersListSearch(state as StateSchema)).toEqual('')
  })

  test('getUsersListSearch.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListSearch(state as StateSchema)).toEqual('')
  })
})
