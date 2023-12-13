import type { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListTotalPages = (state: StateSchema) => state.usersList?.totalPages ?? 1
