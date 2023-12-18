import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListTotalPages } from './getUsersListTotalPages'

describe('getUsersListTotalPages.test', () => {
  test('Simple getUsersListTotalPages.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        totalPages: 10,
      },
    }
    expect(getUsersListTotalPages(state as StateSchema)).toEqual(10)
  })

  test('getUsersListTotalPages.test with undefined totalPages', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        totalPages: undefined,
      },
    }
    expect(getUsersListTotalPages(state as StateSchema)).toEqual(1)
  })

  test('getUsersListTotalPages.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListTotalPages(state as StateSchema)).toEqual(1)
  })
})
