import type { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListSearch = (state:StateSchema) => state.usersList?.search ?? ''
