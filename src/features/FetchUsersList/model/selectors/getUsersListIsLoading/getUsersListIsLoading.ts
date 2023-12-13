import { StateSchema } from 'app/providers/StoreProvider';

export const getUsersListIsLoading = (state: StateSchema) => state.usersList?.isLoading ?? false;
