import { StateSchema } from 'app/providers/StoreProvider';

export const getUserBalance = (state: StateSchema) => state.userTransactions?.userBalance
