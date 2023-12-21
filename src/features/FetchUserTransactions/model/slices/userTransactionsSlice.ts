import {
  EntityAdapter,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { Transaction } from 'entities/Transaction'

import { fetchUserTransactions } from '../services/fetchUserTransactions/fetchUserTransactions'
import { UserTransactionsSchema } from '../types/userTransactionsSchema'

const initialState: UserTransactionsSchema = {
  ids: [],
  entities: {},
  isLoading: false,
  error: undefined,
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => {
    const aDate = new Date(a.created_at)
    const bDate = new Date(b.created_at)

    return bDate.getTime() - aDate.getTime()
  },
})

export const userTransactionsSlice = createSlice({
  name: 'userTransactions',
  initialState: transactionsAdapter.getInitialState(initialState),
  reducers: {
    transactionAdded: transactionsAdapter.addOne,
    transactionsReceived(state, action: PayloadAction<Transaction[]>) {
      transactionsAdapter.setAll(state, action.payload)
    },

  },
  extraReducers: (builder) => builder
    .addCase(fetchUserTransactions.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    .addCase(
      fetchUserTransactions.fulfilled,
      (state, action: PayloadAction<Transaction[]>) => {
        transactionsAdapter.setAll(state, action.payload)
        state.isLoading = false
      },
    )
    .addCase(fetchUserTransactions.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }),
})

export const { actions: userTransactionsActions } = userTransactionsSlice
export const { reducer: userTransactionsReducer } = userTransactionsSlice
