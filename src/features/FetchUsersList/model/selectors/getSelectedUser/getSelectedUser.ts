import type { StateSchema } from 'app/providers/StoreProvider';

export const getSelectedUser = (state: StateSchema) => state.usersList?.selectedUser
