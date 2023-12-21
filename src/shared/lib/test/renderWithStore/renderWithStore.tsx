import { ReducersMapObject } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export interface ComponentRenderOptions {
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {},
) {
  const { initialState, asyncReducers } = options
  return render(
    <StoreProvider initialState={initialState as StateSchema} asyncReducers={asyncReducers}>
      {component}
    </StoreProvider>,
  )
}
