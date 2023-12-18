import { StateSchema } from 'app/providers/StoreProvider'
import { TestAsyncThunk } from 'shared/lib/test/TestAsynkThunk/TestAsyncThunk'

import { fetchUsersList } from './fetchUsersList'
import { UsersListOrder } from '../../types/usersListSchema'

const returnData = {
  data: [
    {
      id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
      email: 'Lloyd.Grimes34@yahoo.com',
      tg_id: null,
      name: 'Mrs. Veronica Glover',
      password: null,
      avatar: null,
      created_at: '2023-12-17T11:20:20.298Z',
      role: 'USER',
      subscription: {
        id: '0e1c97ff-e281-432a-bf97-22c9f93d6bcf',
        plan_id: 'd0d9294f-2f7b-4fb0-a228-990b257e1944',
        user_id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
        tokens: 8183237,
        additional_tokens: 0,
        created_at: '2023-12-17T11:20:20.298Z',
        plan: {
          id: 'd0d9294f-2f7b-4fb0-a228-990b257e1944',
          type: 'ELITE',
          price: 0,
          currency: 'RUB',
          tokens: 0,
        },
      },
    },
    {
      id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
      email: 'Jerrold_Goyette77@yahoo.com',
      tg_id: null,
      name: 'Mrs. Kristin Homenick',
      password: null,
      avatar: null,
      created_at: '2023-12-17T11:20:20.297Z',
      role: 'USER',
      subscription: {
        id: '1fb4c963-d753-483f-893e-763d6d565bdd',
        plan_id: '3c586c93-acae-4f60-a04c-289e5fb593bf',
        user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
        tokens: 1534244,
        additional_tokens: 0,
        created_at: '2023-12-17T11:20:20.297Z',
        plan: {
          id: '3c586c93-acae-4f60-a04c-289e5fb593bf',
          type: 'ELITE',
          price: 0,
          currency: 'EUR',
          tokens: 0,
        },
      },
    },
    {
      id: 'cb934df5-b4a6-4f7a-baf8-2c3f409de55b',
      email: 'Khalid_Weissnat54@yahoo.com',
      tg_id: null,
      name: 'Glen Toy',
      password: null,
      avatar: null,
      created_at: '2023-12-17T11:20:20.294Z',
      role: 'USER',
      subscription: {
        id: 'b4174475-fe4d-4c00-966a-752efea756c8',
        plan_id: 'b0c3bc84-d32e-4663-8567-752b71ba7515',
        user_id: 'cb934df5-b4a6-4f7a-baf8-2c3f409de55b',
        tokens: 968117,
        additional_tokens: 0,
        created_at: '2023-12-17T11:20:20.294Z',
        plan: {
          id: 'b0c3bc84-d32e-4663-8567-752b71ba7515',
          type: 'PREMIUM',
          price: 0,
          currency: 'RUB',
          tokens: 0,
        },
      },
    },
    {
      id: '0bbf84e8-ef72-406a-aacb-85acaf07c1c6',
      email: 'Kolby_Thiel@hotmail.com',
      tg_id: null,
      name: 'Mr. Jan Bartell',
      password: null,
      avatar: null,
      created_at: '2023-12-17T11:20:20.294Z',
      role: 'USER',
      subscription: {
        id: 'd803aa79-a668-466d-8dc5-ed6f7becb2f0',
        plan_id: 'b0c3bc84-d32e-4663-8567-752b71ba7515',
        user_id: '0bbf84e8-ef72-406a-aacb-85acaf07c1c6',
        tokens: 928087,
        additional_tokens: 0,
        created_at: '2023-12-17T11:20:20.294Z',
        plan: {
          id: 'b0c3bc84-d32e-4663-8567-752b71ba7515',
          type: 'PREMIUM',
          price: 0,
          currency: 'RUB',
          tokens: 0,
        },
      },
    },
  ],
  pages: 5,
}

describe('fetchUsersList.test', () => {
  test('Simple fetchUsersList.test', async () => {
    const state: DeepPartial<StateSchema> = {
      usersList: {
        selectedUser: undefined,
        order: UsersListOrder.ASC,
        search: '',
        currentPage: 1,
        totalPages: 1,
        error: undefined,
        isLoading: false,
        ids: [],
        entities: {},
      },
    }
    const thunk = new TestAsyncThunk(fetchUsersList, state)

    thunk.api.get.mockReturnValue(Promise.resolve({ data: returnData }))

    const result = await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(thunk.dispatch).toHaveBeenNthCalledWith(1, {
      type: 'usersList/fetchUsersList/pending',
      payload: undefined,
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    })
    expect(thunk.dispatch).toHaveBeenNthCalledWith(2, {
      type: 'usersList/fetchUsersList/fulfilled',
      payload: {
        data: returnData.data,
        pages: returnData.pages,
      },
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    })

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
    expect(result.payload).toEqual(returnData)
  })

  test('fetching with error fetchUsersList.test', async () => {
    const state: DeepPartial<StateSchema> = {
      usersList: {
        selectedUser: undefined,
        order: UsersListOrder.ASC,
        search: '',
        currentPage: 1,
        totalPages: 1,
        error: undefined,
        isLoading: false,
        ids: [],
        entities: {},
      },
    }
    const thunk = new TestAsyncThunk(fetchUsersList, state)

    thunk.api.get.mockReturnValue(Promise.reject(new Error()))

    const result = await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(thunk.dispatch).toHaveBeenNthCalledWith(1, {
      type: 'usersList/fetchUsersList/pending',
      payload: undefined,
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    })
    expect(thunk.dispatch).toHaveBeenNthCalledWith(2, {
      type: 'usersList/fetchUsersList/rejected',
      payload: 'Error while fetching users list',
      error: {
        message: 'Rejected',
      },
      meta: {
        arg: undefined,
        aborted: false,
        condition: false,
        rejectedWithValue: true,
        requestId: expect.any(String),
        requestStatus: 'rejected',
      },
    })

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('Error while fetching users list')
  })
})
