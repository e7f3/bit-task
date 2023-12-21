import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from 'entities/Transaction'
import { Currency } from 'shared/types/common'

import {
  transactionsAdapter,
  userTransactionsActions,
  userTransactionsReducer,
} from './userTransactionsSlice'
import { UserTransactionsSchema } from '../types/userTransactionsSchema'

const transactions: Transaction[] = [
  {
    id: '565ad6cf-6ffb-4c4b-a329-e686c57082d7',
    provider: 'SYSTEM',
    amount: 308166,
    currency: Currency.SYSTEM_TOKEN,
    meta: null,
    status: TransactionStatus.SUCCEDED,
    type: TransactionType.REPLENISH,
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
    currency: Currency.SYSTEM_TOKEN,
    meta: null,
    status: TransactionStatus.PENDING,
    type: TransactionType.REPLENISH,
    plan_id: null,
    user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
    referral_id: null,
    created_at: '2023-12-18T08:10:00.437Z',
    external_id: null,
  },
]

describe('userTransactions.test', () => {
  test('userTransactions.test set transactions', () => {
    const state: DeepPartial<UserTransactionsSchema> = transactionsAdapter.getInitialState({
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    })

    expect(
      userTransactionsReducer(
        state as UserTransactionsSchema,
        userTransactionsActions.transactionsReceived(transactions),
      ),
    ).toEqual({
      isLoading: false,
      error: undefined,
      ids: transactions.map((transaction) => transaction.id),
      entities: transactions.reduce((acc, transaction) => {
        acc[transaction.id] = transaction
        return acc
      }, {} as Record<string, Transaction>),
    })
  })
})
