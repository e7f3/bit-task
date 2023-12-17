import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import {
  getUsersListCurrentPage,
  getUsersListSearch,
  getUsersListTotalPages,
  fetchUsersList,
  usersListActions,
  UsersList,
} from 'features/FetchUsersList'
import { userTransactionsActions } from 'features/FetchUserTransactions/model/slices/userTransactionsSlice'
import { Pagination } from 'features/Pagination'
import { Search } from 'features/Search'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useDebouncedCallback } from 'shared/lib/hooks/useDebounceCallback'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import classes from './Users.module.scss'

interface UsersProps {
  onUserClick?: (userId: string) => void
}

const DEBOUNCE_TIMEOUT = 500

export const Users: FC<UsersProps> = memo((props) => {
  const { onUserClick } = props
  const dispatch = useAppDispatch()
  const search = useSelector(getUsersListSearch)
  const currentPageNumber = useSelector(getUsersListCurrentPage)
  const totalPages = useSelector(getUsersListTotalPages)

  const fetchUsersListDebounced = useDebouncedCallback(() => {
    dispatch(fetchUsersList())
  }, DEBOUNCE_TIMEOUT)

  const onSearchChange = useCallback(
    (value: string) => {
      dispatch(usersListActions.setSearch(value))
      dispatch(usersListActions.setCurrentPageNumber(1))
      fetchUsersListDebounced()
    },
    [dispatch, fetchUsersListDebounced],
  )

  const onPageChange = useCallback(
    (newPageNumber: number) => {
      dispatch(usersListActions.setCurrentPageNumber(newPageNumber))
      dispatch(fetchUsersList())
    },
    [dispatch],
  )

  return (
    <div className={classes.Users}>
      <Text className={classes.Title} variant={TextVariant.BODY_XL_SEMIBOLD}>
        Пользователи
      </Text>
      <Search
        className={classes.UsersSearch}
        value={search}
        onChange={onSearchChange}
      />
      <UsersList className={classes.UsersList} onUserClick={onUserClick} />
      <Pagination
        className={classes.UsersListPagination}
        currentPage={currentPageNumber}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
})
