import {
  EntityAdapter, PayloadAction, createEntityAdapter, createSlice,
} from '@reduxjs/toolkit'

import { User } from 'entities/User'

import { FetchUsersListResponse, fetchUsersList } from '../services/fetchUsersList/fetchUsersList'
import { UsersListOrder, UsersListSchema } from '../types/usersListSchema'

const initialState: UsersListSchema = {
  ids: [],
  entities: {},
  isLoading: false,
  search: undefined,
  error: undefined,
  order: UsersListOrder.ASC,
  currentPage: 1,
  totalPages: 1,
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  // sortComparer: (a, b) => a.id.localeCompare(b.id),
})

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersReceived(state, action: PayloadAction<User[]>) {
      usersAdapter.setAll(state, action.payload)
    },

    setCurrentPageNumber(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setTotalPagesNumber(state, action: PayloadAction<number>) {
      state.totalPages = action.payload
    },
    setListOrder(state, action: PayloadAction<UsersListOrder>) {
      state.order = action.payload
    },
    toggleListOrder(state) {
      state.order = state.order === UsersListOrder.ASC ? UsersListOrder.DESC : UsersListOrder.ASC
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchUsersList.fulfilled, (state, action: PayloadAction<FetchUsersListResponse>) => {
        usersAdapter.setAll(state, action.payload.data)
        state.totalPages = action.payload.pages
        state.isLoading = false
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: usersListActions } = usersListSlice
export const { reducer: usersListReducer } = usersListSlice
