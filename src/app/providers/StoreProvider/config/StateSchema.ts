import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  AnyAction,
  CombinedState,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

import type { UsersListSchema } from 'features/FetchUsersList'
import type { UserTransactionsSchema } from 'features/FetchUserTransactions'

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface StateSchema {
  usersList: UsersListSchema
  userTransactions?: UserTransactionsSchema
}

export type StateSchemaKey = keyof StateSchema

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkApiConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgument
  state: StateSchema
}

export interface ThunkExtraArgument {
  api: AxiosInstance
}
