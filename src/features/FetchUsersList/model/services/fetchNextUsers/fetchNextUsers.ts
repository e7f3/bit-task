import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkApiConfig } from 'app/providers/StoreProvider'

import { getUsersListCurrentPage } from '../../selectors/getUsersListCurrentPage/getUsersListCurrentPage'
import { getUsersListTotalPages } from '../../selectors/getUsersListTotalPages/getUsersListTotalPages'
import { usersListActions } from '../../slices/usersListSlice'
import { fetchUsersList } from '../fetchUsersList/fetchUsersList'

export const fetchNextUsers = createAsyncThunk<
  void,
  void,
  ThunkApiConfig<string>
>('usersList/fetchNextUsers', async (_, thunkApi) => {
  try {
    const { dispatch, getState } = thunkApi

    const currentPage = getUsersListCurrentPage(getState())
    const totalPages = getUsersListTotalPages(getState())

    if (currentPage < totalPages) {
      dispatch(usersListActions.setCurrentPageNumber(currentPage + 1))
      await dispatch(fetchUsersList())
    }

    return
  } catch (error) {
    // console.log(error)
    thunkApi.rejectWithValue('Error while fetching next users')
  }
})
