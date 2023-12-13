import { EntityState } from '@reduxjs/toolkit'

import { Transaction } from 'entities/Transaction'

export interface UserTransactionsSchema extends EntityState<Transaction> {
  userId?: string
  isLoading: boolean
  error?: string
}
