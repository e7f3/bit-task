import type { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListCurrentPage = (state: StateSchema) => state.usersList?.currentPage ?? 1
