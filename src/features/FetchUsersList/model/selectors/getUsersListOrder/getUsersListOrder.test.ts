import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersListOrder } from './getUsersListOrder'
import { UsersListOrder } from '../../types/usersListSchema'

describe('getUsersListOrder.test', () => {
  test('Simple getUsersListOrder.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        order: UsersListOrder.DESC,
      },
    }
    expect(getUsersListOrder(state as StateSchema)).toEqual(UsersListOrder.DESC)
  })

  test('getUsersListOrder.test with undefined order', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        order: undefined,
      },
    }
    expect(getUsersListOrder(state as StateSchema)).toEqual(UsersListOrder.ASC)
  })

  test('getUsersListOrder.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getUsersListOrder(state as StateSchema)).toEqual(UsersListOrder.ASC)
  })
})
