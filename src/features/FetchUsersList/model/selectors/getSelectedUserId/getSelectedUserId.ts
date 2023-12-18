import type { StateSchema } from 'app/providers/StoreProvider';

export const getSelectedUserId = (state: StateSchema) => state.usersList?.selectedUser?.id
