import { screen } from '@testing-library/react'

import { User } from 'entities/User'
import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { UsersList } from './UsersList'

const ids = [
  'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
  'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
  'cb934df5-b4a6-4f7a-baf8-2c3f409de55b',
  '0bbf84e8-ef72-406a-aacb-85acaf07c1c6',
]

const entities = {
  'cb7bde4f-3f3d-443f-8df8-b6da7e92598b': {
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
  'f2a7d21f-bd3b-4885-89fb-c939cfac33ee': {
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
  'cb934df5-b4a6-4f7a-baf8-2c3f409de55b': {
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
  '0bbf84e8-ef72-406a-aacb-85acaf07c1c6': {
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
}

describe('UsersList.test', () => {
  test('Simple UsersList.test', () => {
    componentRender(<UsersList />, {
      initialState: {
        usersList: {
          ids,
          entities: entities as Record<string, User>,
          currentPage: 1,
          totalPages: 5,
          isLoading: false,
          error: undefined,
        },
      },
    })

    const usersList = screen.getByTestId('users-list')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(screen.getByTestId('list'))
    expect(screen.getAllByTestId('list-item')).toHaveLength(4)
    expect(screen.getByTestId('list-head')).toContainElement(screen.getByTestId('list-head-controls'))
    expect(screen.getByTestId('list-head').children.length).toEqual(6)
  })

  test('UsersList.test with no users', () => {
    componentRender(<UsersList />, {
      initialState: {
        usersList: {
          ids: [],
          entities: {},
          currentPage: 1,
          totalPages: 1,
          isLoading: false,
          error: undefined,
        },
      },
    })

    const usersList = screen.getByTestId('users-list')
    const list = screen.getByTestId('list')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(list)
    expect(list).not.toContainElement(screen.queryByTestId('list-item'))
  })
})
