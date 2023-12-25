import { fireEvent, screen } from '@testing-library/react'

import { StateSchema } from 'app/providers/StoreProvider'
import { User } from 'entities/User'
import { componentRender } from 'shared/lib/test/renderWithStore/renderWithStore'

import { Users } from './Users'

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

const initialState: DeepPartial<StateSchema> = {
  usersList: {
    ids,
    entities: entities as Record<string, User>,
    isLoading: false,
    error: undefined,
    selectedUser: undefined,
    currentPage: 1,
    totalPages: 5,
    search: '',
  },
}

const onUserClick = jest.fn()

describe('Users.test', () => {
  test('Simple Users.test', () => {
    componentRender(<Users />, {
      initialState,
    })

    const users = screen.getByTestId('users')
    const pagination = screen.getByTestId('pagination')
    const search = screen.getByTestId('input')
    const usersList = screen.getByTestId('users-list')

    expect(users).toBeInTheDocument()
    expect(pagination).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    expect(usersList).toBeInTheDocument()
  })

  test('Users.test without pagination', () => {
    componentRender(<Users />, {
      initialState: {
        usersList: {
          ids,
          entities: entities as Record<string, User>,
          isLoading: false,
          error: undefined,
          totalPages: 1,
          currentPage: 1,
        },
      },
    })

    const users = screen.getByTestId('users')
    const pagination = screen.queryByTestId('pagination')
    expect(users).toBeInTheDocument()
    expect(pagination).toBeNull()
  })

  test('Users.test search change', () => {
    componentRender(<Users />, {
      initialState,
    })

    const search = screen.getByTestId('input')
    expect(search).toBeInTheDocument()
    expect(search).toHaveValue('')

    fireEvent.change(search, { target: { value: 'test' } })

    expect(search).toHaveValue('test')
  })

  test('Users.test users count', () => {
    componentRender(<Users />, {
      initialState,
    })

    const usersList = screen.getByTestId('users-list')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(screen.getByTestId('list'))
    expect(screen.getAllByTestId('list-item')).toHaveLength(4)
  })

  test('Users.test user click', () => {
    componentRender(<Users onUserClick={onUserClick} />, {
      initialState,
    })

    const usersList = screen.getByTestId('users-list')
    expect(usersList).toBeInTheDocument()
    expect(usersList).toContainElement(screen.getByTestId('list'))
    expect(screen.getAllByTestId('list-item')).toHaveLength(4)

    fireEvent.click(screen.getAllByTestId('list-item')[0])

    expect(onUserClick).toHaveBeenCalledTimes(1)
    expect(onUserClick).toHaveBeenCalledWith(
      ids[0],
    )
  })

  test('Users.test users are loading', () => {
    componentRender(<Users />, {
      initialState: {
        usersList: {
          ids: [],
          entities: {},
          isLoading: true,
          error: undefined,
          totalPages: 1,
          currentPage: 1,
        },
      },
    })

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  test('Users.test users error', () => {
    componentRender(<Users />, {
      initialState: {
        usersList: {
          ids: [],
          entities: {},
          isLoading: false,
          error: 'Error',
          totalPages: 1,
          currentPage: 1,
        },
      },
    })

    const users = screen.getByTestId('users')
    const errorText = screen.getByTestId('text')
    expect(users).toBeInTheDocument()
    expect(users).toContainElement(errorText)
    expect(errorText).toHaveTextContent('Error')
  })
})
