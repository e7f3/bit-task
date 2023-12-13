import { StateSchema } from 'app/providers/StoreProvider';

export const getUserTransactionsIsLoading = (state: StateSchema) => state.userTransactions?.isLoading ?? false;
