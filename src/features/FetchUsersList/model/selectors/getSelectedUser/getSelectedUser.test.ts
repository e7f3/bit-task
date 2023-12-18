import { StateSchema } from 'app/providers/StoreProvider'

import { getSelectedUser } from './getSelectedUser'

describe('getSelectedUser.test', () => {
  test('Simple getSelectedUser.test', () => {
    const state: DeepPartial<StateSchema> = {
      usersList: {
        selectedUser: {
          id: '1',
          name: 'Test',
          email: '',
        },
      },
    }
    expect(getSelectedUser(state as StateSchema)).toEqual({
      id: '1',
      name: 'Test',
      email: '',
    })
  })

  test('getSelectedUser.test with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getSelectedUser(state as StateSchema)).toBeUndefined()
  })
})
