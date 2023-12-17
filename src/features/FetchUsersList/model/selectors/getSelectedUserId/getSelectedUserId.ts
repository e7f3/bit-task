import type { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListSelectedUserId = (state: StateSchema) => state.usersList?.selectedUser?.id
