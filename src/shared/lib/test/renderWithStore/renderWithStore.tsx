import { render } from '@testing-library/react'
import { ReactNode } from 'react'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export interface ComponentRenderOptions {
  initialState?: DeepPartial<StateSchema>
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {},
) {
  const { initialState } = options
  return render(
    <StoreProvider initialState={initialState as StateSchema}>
      {component}
    </StoreProvider>,
  )
}
