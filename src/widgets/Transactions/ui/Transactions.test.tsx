import { fireEvent, screen } from '@testing-library/react'

import { Transaction } from 'entities/Transaction'
import { User } from 'entities/User'
import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { Transactions } from './Transactions'

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

const selectedUser = {
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
}

const onClose = jest.fn()

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Transactions.test', () => {
  test('Simple Transactions.test', () => {
    componentRender(<Transactions isOpen onClose={onClose} />, {

      initialState: {
        usersList: {
          selectedUser: selectedUser as User,
        },
      },
      asyncReducers: {
        userTransactions: {
          ids,
          entities: entities as Record<string, Transaction>,
          isLoading: false,
          error: undefined,
        },
      },
    })

    const transactions = screen.queryByTestId('transactions')

    expect(transactions).toBeInTheDocument()
  })
})
