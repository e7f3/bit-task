import { screen } from '@testing-library/react'

import { Transaction } from 'entities/Transaction'
import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { UserTransactions } from './UserTransactions'
import { userTransactionsReducer } from '../../model/slices/userTransactionsSlice'

const entities = {
  '565ad6cd-6ffb-4c4b-a329-e686c57082d7': {
    id: '565ad6cd-6ffb-4c4b-a329-e686c57082d7',
    provider: 'SYSTEM',
    amount: 308166,
    currency: 'SYSTEM_TOKEN',
    meta: null,
    status: 'SUCCEDED',
    type: 'REPLENISH',
    plan_id: null,
    user_id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
    referral_id: null,
    created_at: '2023-12-18T08:20:00.172Z',
    external_id: null,
  },
  'b6cceed0-59d8-4d96-a30a-6c2ad0985998': {
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
  '84bcc219-c274-44ba-8453-ccf60ab07a7f': {
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
  '5ebec6b4-1f85-49c5-85ef-729ff1adecdb': {
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
}

const ids = [
  '565ad6cd-6ffb-4c4b-a329-e686c57082d7',
  'b6cceed0-59d8-4d96-a30a-6c2ad0985998',
  '84bcc219-c274-44ba-8453-ccf60ab07a7f',
  '5ebec6b4-1f85-49c5-85ef-729ff1adecdb',
]

describe('UserTransactions.test', () => {
  test('Simple UserTransactions.test', () => {
    componentRender(
      <UserTransactions />,
      {
        initialState: {
          userTransactions: {
            userBalance: 0,
            isLoading: false,
            error: undefined,
            ids,
            entities: entities as Record<string, Transaction>,
          },
        },
        asyncReducers: { userTransactions: userTransactionsReducer },
      },
    )

    const usersList = screen.getByTestId('user-transactions')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(screen.getByTestId('list'))
    expect(screen.getAllByTestId('list-item')).toHaveLength(4)
    expect(screen.getByTestId('list-head')).not.toContainElement(screen.queryByTestId('list-head-controls'))
    expect(screen.getByTestId('list-head').children.length).toEqual(3)
  })

  test('UserTransactions.test with no transactions', () => {
    componentRender(
      <UserTransactions />,
      {
        initialState: {
          userTransactions: {
            userBalance: 0,
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
          },
        },
        asyncReducers: { userTransactions: userTransactionsReducer },
      },
    )

    const usersList = screen.getByTestId('user-transactions')
    const list = screen.getByTestId('list')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(list)
    expect(list).not.toContainElement(screen.queryByTestId('list-item'))
  })
})
