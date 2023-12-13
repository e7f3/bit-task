import type { StateSchema } from 'app/providers/StoreProvider';

import { UsersListOrder } from '../../types/usersListSchema';

export const getUsersListOrder = (state: StateSchema) => state.usersList?.order ?? UsersListOrder.ASC
