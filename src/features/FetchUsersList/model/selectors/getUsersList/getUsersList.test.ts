import { StateSchema } from 'app/providers/StoreProvider'

import { getUsersList } from './getUsersList'

describe('getUsersList.test', () => {
  test('getUsersList.test get all users', () => {
    const state: DeepPartial<StateSchema> = {
      usersList: {
        ids: ['1'],
        entities: {
          1: {
            id: '1',
            name: 'Test',
            email: '',
          },
        },
      },
    }
    expect(getUsersList.selectAll(state as StateSchema)).toEqual([{
      id: '1',
      name: 'Test',
      email: '',
    }])
  })

  test('getUsersList.test get user by id', () => {
    const state: DeepPartial<StateSchema> = {
      usersList: {
        ids: ['1'],
        entities: {
          1: {
            id: '1',
            name: 'Test',
            email: '',
          },
        },
      },
    }
    expect(getUsersList.selectById(state as StateSchema, '1')).toEqual({
      id: '1',
      name: 'Test',
      email: '',
    })
  })

  test('getUsersList.test with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getUsersList.selectAll(state as StateSchema)).toEqual([])
  })
})
