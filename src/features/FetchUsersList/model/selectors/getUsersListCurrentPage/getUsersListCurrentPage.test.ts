import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListCurrentPage } from './getUsersListCurrentPage'

describe('getUsersListCurrentPage.test', () => {
  test('Simple getUsersListCurrentPage.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        currentPage: 2,
      },
    }
    expect(getUsersListCurrentPage(state as StateSchema)).toEqual(2)
  })

  test('getUsersListCurrentPage.test with undefined currentPage', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        currentPage: undefined,
      },
    }
    expect(getUsersListCurrentPage(state as StateSchema)).toEqual(1)
  })

  test('getUsersListCurrentPage.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListCurrentPage(state as StateSchema)).toEqual(1)
  })
})
