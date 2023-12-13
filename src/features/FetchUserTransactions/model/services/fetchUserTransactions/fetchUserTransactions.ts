import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkApiConfig } from 'app/providers/StoreProvider';
import { Transaction } from 'entities/Transaction';

interface FetchUserTransactionsParams {
  userId: string
}

export const fetchUserTransactions = createAsyncThunk<Transaction[], FetchUserTransactionsParams, ThunkApiConfig<string>>(
  'userTransactions/fetchUserTransactions',
  async ({ userId }, thunkApi) => {
    try {
      const { extra } = thunkApi
      const { api } = extra

      const response = await api.get<Transaction[]>(`/user/${userId}/transactions`)

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue('Error while fetching user transactions')
    }
  },
)
