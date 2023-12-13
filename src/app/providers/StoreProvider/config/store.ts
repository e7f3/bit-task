import {
  configureStore,
  Reducer,
  ReducersMapObject,
  CombinedState,
  AnyAction,
} from '@reduxjs/toolkit'

import { usersListReducer } from 'features/FetchUsersList'
import { $api } from 'shared/api/api'

import { createReducerManager } from './reducerManager'
import type { StateSchema, ThunkExtraArgument } from './StateSchema'

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    usersList: usersListReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArgument = { api: $api }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<
      CombinedState<StateSchema>,
      AnyAction
    >,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type RootState = ReducersMapObject<StateSchema>
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = AppStore['dispatch']
