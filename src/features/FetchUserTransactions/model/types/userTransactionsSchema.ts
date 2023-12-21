import { EntityState } from '@reduxjs/toolkit'

import { Transaction } from 'entities/Transaction'

export interface UserTransactionsSchema extends EntityState<Transaction> {
  isLoading: boolean
  error?: string
}
