import { StateSchema } from 'app/providers/StoreProvider'
import { User } from 'entities/User'
import {
  UserRole,
  UserSubscriptionPlanType,
} from 'entities/User/model/types/user'

import {
  usersAdapter,
  usersListActions,
  usersListReducer,
} from './usersListSlice'
import { UsersListOrder, UsersListSchema } from '../types/usersListSchema'

const users: User[] = [
  {
    id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
    email: 'Lloyd.Grimes34@yahoo.com',
    tg_id: null,
    name: 'Mrs. Veronica Glover',
    password: null,
    avatar: null,
    created_at: '2023-12-17T11:20:20.298Z',
    role: UserRole.USER,
    subscription: {
      id: '0e1c97ff-e281-432a-bf97-22c9f93d6bcf',
      plan_id: 'd0d9294f-2f7b-4fb0-a228-990b257e1944',
      user_id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
      tokens: 8183237,
      additional_tokens: 0,
      created_at: '2023-12-17T11:20:20.298Z',
      plan: {
        id: 'd0d9294f-2f7b-4fb0-a228-990b257e1944',
        type: UserSubscriptionPlanType.PREMIUM,
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
    role: UserRole.USER,
    subscription: {
      id: '1fb4c963-d753-483f-893e-763d6d565bdd',
      plan_id: '3c586c93-acae-4f60-a04c-289e5fb593bf',
      user_id: 'f2a7d21f-bd3b-4885-89fb-c939cfac33ee',
      tokens: 1534244,
      additional_tokens: 0,
      created_at: '2023-12-17T11:20:20.297Z',
      plan: {
        id: '3c586c93-acae-4f60-a04c-289e5fb593bf',
        type: UserSubscriptionPlanType.PREMIUM,
        price: 0,
        currency: 'EUR',
        tokens: 0,
      },
    },
  },
]

describe('usersListSlice.test', () => {
  test('usersListSlice.test set new current page number', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.setCurrentPageNumber(2),
      ),
    ).toEqual({
      totalPages: 5,
      currentPage: 2,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    })
  })

  test('usersListSlice.test set new order', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.setListOrder(UsersListOrder.DESC),
      ),
    ).toEqual({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
      order: UsersListOrder.DESC,
    })
  })

  test('usersListSlice.test toggle order', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.toggleListOrder(),
      ),
    ).toEqual({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
      order: UsersListOrder.DESC,
    })
  })

  test('usersListSlice.test set new search', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.setSearch('test'),
      ),
    ).toEqual({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
      search: 'test',
      order: UsersListOrder.ASC,
    })
  })

  test('usersListSlice.test set new total pages', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.setTotalPagesNumber(10),
      ),
    ).toEqual({
      totalPages: 10,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
      order: UsersListOrder.ASC,
    })
  })

  test('usersListSlice.test set users', () => {
    const state: DeepPartial<UsersListSchema> = usersAdapter.getInitialState({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: [],
      entities: {},
    })
    expect(
      usersListReducer(
        state as UsersListSchema,
        usersListActions.usersReceived(users),
      ),
    ).toEqual({
      totalPages: 5,
      currentPage: 1,
      isLoading: false,
      error: undefined,
      order: UsersListOrder.ASC,
      ids: users.map((user) => user.id),
      entities: users.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {} as Record<string, User>),
    })
  })
})
