import { StateSchema } from 'app/providers/StoreProvider';

export const getUserTransactionsError = (state: StateSchema) => state.userTransactions?.error
