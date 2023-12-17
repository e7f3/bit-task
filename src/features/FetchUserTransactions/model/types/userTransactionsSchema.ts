import { EntityState } from '@reduxjs/toolkit'

import { Transaction } from 'entities/Transaction'

export interface UserTransactionsSchema extends EntityState<Transaction> {
  userBalance?: number
  isLoading: boolean
  error?: string
}
