import { ReducersMapObject } from '@reduxjs/toolkit'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'

import type { StateSchema } from '../config/StateSchema'
import { createReduxStore } from '../config/store'

/* global DeepPartial */

export interface StoreProviderProps {
  initialState?: StateSchema
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  children?: ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { initialState, children, asyncReducers } = props
  const store = createReduxStore(
    initialState,
    asyncReducers as ReducersMapObject<StateSchema>,
  )

  return <Provider store={store}>{children}</Provider>
}
