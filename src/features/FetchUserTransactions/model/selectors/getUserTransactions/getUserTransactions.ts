import { StateSchema } from 'app/providers/StoreProvider';

import { transactionsAdapter } from '../../slices/userTransactionsSlice';

export const getUserTransactions = transactionsAdapter.getSelectors<StateSchema>(
  (state) => state.userTransactions ?? transactionsAdapter.getInitialState(),
);
