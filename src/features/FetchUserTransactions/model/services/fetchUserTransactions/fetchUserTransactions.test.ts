import { StateSchema } from 'app/providers/StoreProvider'
import { Transaction } from 'entities/Transaction'
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
  test('fetchUserTransactions.test successful', async () => {
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
    expect(thunk.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchUserTransactions.pending(expect.any(String), {
        userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
      }),
    )
    expect(thunk.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchUserTransactions.fulfilled(
        returnedData as Transaction[],
        expect.any(String),
        {
          userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
        },
      ),
    )
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

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk({
      userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    })

    expect(thunk.api.get).toHaveBeenCalled()
    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(thunk.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchUserTransactions.pending(expect.any(String), {
        userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
      }),
    )
    expect(thunk.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchUserTransactions.rejected(
        expect.any(Error('Rejected')),
        expect.any(String),
        {
          userId: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
        },
        'Error while fetching user transactions',
      ),
    )
    expect(result.payload).toEqual('Error while fetching user transactions')
  })
})
