import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import {
  getUsersListCurrentPage,
  getUsersListSearch,
  getUsersListTotalPages,
  fetchUsersList,
  usersListActions,
  UsersList,
  getUsersListError,
  getUsersListIsLoading,
} from 'features/FetchUsersList'
import { Pagination } from 'features/Pagination'
import { Search } from 'features/Search'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useDebouncedCallback } from 'shared/lib/hooks/useDebounceCallback'
import { Spinner } from 'shared/ui/Spinner/Spinner'
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
  const isLoading = useSelector(getUsersListIsLoading)
  const error = useSelector(getUsersListError)

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

  const onSortToggle = useCallback(() => {
    dispatch(usersListActions.setCurrentPageNumber(1))
    dispatch(usersListActions.toggleListOrder())
    dispatch(fetchUsersList())
  }, [dispatch])

  if (error) {
    return (
      <div className={classes.Users} data-testid='users'>
        <Text variant={TextVariant.BODY_XL_SEMIBOLD}>{error}</Text>
      </div>
    )
  }

  if (isLoading) {
    return <Spinner className={classes.Spinner} />
  }

  return (
    <div className={classes.Users} data-testid='users'>
      <Text className={classes.Title} variant={TextVariant.BODY_XL_SEMIBOLD}>
        Пользователи
      </Text>
      <Search
        className={classes.UsersSearch}
        value={search}
        onChange={onSearchChange}
      />
      <UsersList
        className={classes.UsersList}
        onUserClick={onUserClick}
        onSortToggle={onSortToggle}
      />
      <Pagination
        className={classes.UsersListPagination}
        currentPage={currentPageNumber}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
})
