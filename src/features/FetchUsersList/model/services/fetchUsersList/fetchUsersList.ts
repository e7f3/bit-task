import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ThunkApiConfig } from 'app/providers/StoreProvider'
import type { User } from 'entities/User'

import { getUsersListCurrentPage } from '../../selectors/getUsersListCurrentPage/getUsersListCurrentPage'
import { getUsersListOrder } from '../../selectors/getUsersListOrder/getUsersListOrder'
import { getUsersListSearch } from '../../selectors/getUsersListSearch/getUsersListSearch'

export interface FetchUsersListResponse {
  data: User[]
  pages: number
}

export const fetchUsersList = createAsyncThunk<
  FetchUsersListResponse,
  void,
  ThunkApiConfig<string>
>('usersList/fetchUsersList', async (_, thunkApi) => {
  try {
    const { extra, getState } = thunkApi
    const { api } = extra
    const page = getUsersListCurrentPage(getState())
    const order = getUsersListOrder(getState()) as string
    const search = getUsersListSearch(getState())

    const response = await api.get<FetchUsersListResponse>('/user/list', {
      params: {
        page,
        orderBy: order,
        search,
      },
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (error) {
    // console.log(error)
    return thunkApi.rejectWithValue('Произошла ошибка при загрузке списка пользователей')
  }
})
