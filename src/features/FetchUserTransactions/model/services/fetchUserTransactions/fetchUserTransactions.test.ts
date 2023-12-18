import { StateSchema } from 'app/providers/StoreProvider'
import { TestAsyncThunk } from 'shared/lib/test/TestAsynkThunk/TestAsyncThunk'

import { fetchUserTransactions } from './fetchUserTransactions'

const returnedData = [
  {
    id: '565ad6cf-6ffb-4c4b-a329-e686c57082d7',
    provider: 'SYSTEM',
    amount: 308166,
    currency: 'SYSTEM_TOKEN',
    meta: null,
    status: 'SUCCEDED',
    type: 'REPLENISH',
    plan_id: null,
    user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    referral_id: null,
    created_at: '2023-12-18T08:20:00.172Z',
    external_id: null,
  },
  {
    id: 'b6cceed0-59d8-4d96-a30a-6c2ad0985998',
    provider: 'SYSTEM',
    amount: 226302,
    currency: 'SYSTEM_TOKEN',
    meta: null,
    status: 'PENDING',
    type: 'REPLENISH',
    plan_id: null,
    user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    referral_id: null,
    created_at: '2023-12-18T08:10:00.437Z',
    external_id: null,
  },
  {
    id: '84bcc219-c274-44ba-8453-ccf60ab07a7f',
    provider: 'SYSTEM',
    amount: 347091,
    currency: 'SYSTEM_TOKEN',
    meta: null,
    status: 'SUCCEDED',
    type: 'WRITE_OFF',
    plan_id: null,
    user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    referral_id: null,
    created_at: '2023-12-18T08:00:00.694Z',
    external_id: null,
  },
  {
    id: '5ebec6b4-1f85-49c5-85ef-729ff1adecdb',
    provider: 'SYSTEM',
    amount: 604296,
    currency: 'SYSTEM_TOKEN',
    meta: null,
    status: 'SUCCEDED',
    type: 'REPLENISH',
    plan_id: null,
    user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    referral_id: null,
    created_at: '2023-12-18T07:50:00.966Z',
    external_id: null,
  },
]

describe('fetchUserTransactions.test', () => {
  test('Simple fetchUserTransactions.test', async () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        isLoading: false,
        error: undefined,
        userBalance: undefined,
        ids: [],
        entities: {},
      },
    }

    const thunk = new TestAsyncThunk(fetchUserTransactions, state)

    thunk.api.get.mockReturnValue(Promise.resolve({ data: returnedData }))

    const result = await thunk.callThunk({
      userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    })

    expect(thunk.api.get).toHaveBeenCalled()
    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(thunk.dispatch).toHaveBeenNthCalledWith(1, {
      type: 'userTransactions/fetchUserTransactions/pending',
      payload: undefined,
      meta: {
        arg: { userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee' },
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    })
    expect(thunk.dispatch).toHaveBeenNthCalledWith(2, {
      type: 'userTransactions/fetchUserTransactions/fulfilled',
      payload: returnedData,
      meta: {
        arg: { userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee' },
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    })

    expect(result.payload).toEqual(returnedData)
  })

  test('fetchUserTransactions.test with error', async () => {
    const state: DeepPartial<StateSchema> = {
      userTransactions: {
        isLoading: false,
        error: undefined,
        userBalance: undefined,
        ids: [],
        entities: {},
      },
    }

    const thunk = new TestAsyncThunk(fetchUserTransactions, state)

    thunk.api.get.mockReturnValue(Promise.reject(new Error('Test error')))

    const result = await thunk.callThunk({
      userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    })

    expect(thunk.api.get).toHaveBeenCalled()
    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(thunk.dispatch).toHaveBeenNthCalledWith(1, {
      type: 'userTransactions/fetchUserTransactions/pending',
      payload: undefined,
      meta: {
        arg: { userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee' },
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    })
    expect(thunk.dispatch).toHaveBeenNthCalledWith(2, {
      type: 'userTransactions/fetchUserTransactions/rejected',
      payload: 'Error while fetching user transactions',
      error: { message: 'Rejected' },
      meta: {
        aborted: false,
        condition: false,
        rejectedWithValue: true,
        arg: { userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee' },
        requestId: expect.any(String),
        requestStatus: 'rejected',
      },
    })

    expect(result.payload).toEqual('Error while fetching user transactions')
  })
})
