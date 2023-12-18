import { StateSchema } from 'app/providers/StoreProvider'

import { getSelectedUserId } from './getSelectedUserId'

describe('getSelectedUserId.test', () => {
  test('Simple getSelectedUserId.test', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        selectedUser: {
          id: '1',
        },
      },
    }
    expect(getSelectedUserId(state as StateSchema)).toEqual('1')
  })

  test('getSelectedUserId.test with undefined id', () => {
    const state : DeepPartial<StateSchema> = {
      usersList: {
        selectedUser: {
          id: undefined,
        },
      },
    }
    expect(getSelectedUserId(state as StateSchema)).toBeUndefined()
  })

  test('getSelectedUserId.test with empty state', () => {
    const state : DeepPartial<StateSchema> = {}
    expect(getSelectedUserId(state as StateSchema)).toBeUndefined()
  })
})
