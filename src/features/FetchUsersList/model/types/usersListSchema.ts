import { EntityState } from '@reduxjs/toolkit'

import { User } from 'entities/User'

export interface UsersListSchema extends EntityState<User> {
  isLoading: boolean
  error?: string
  search?: string
  order: UsersListOrder
  currentPage: number
  totalPages: number
}

export enum UsersListOrder {
  ASC = 'tokens:asc',
  DESC = 'tokens:desc',
}
