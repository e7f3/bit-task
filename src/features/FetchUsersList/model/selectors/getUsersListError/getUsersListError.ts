import type { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListError = (state: StateSchema) => state.usersList?.error
