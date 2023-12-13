import type { StateSchema } from 'app/providers/StoreProvider'

import { usersAdapter } from '../../slices/usersListSlice'

export const getUsersList = usersAdapter.getSelectors<StateSchema>(
  (state) => state.usersList ?? usersAdapter.getInitialState(),
)
