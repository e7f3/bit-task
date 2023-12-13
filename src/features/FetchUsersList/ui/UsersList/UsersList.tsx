import {
  FC, memo, useCallback, useEffect, useMemo, useState,
} from 'react'
import { useSelector } from 'react-redux'

import { fetchUsersList } from 'features/FetchUsersList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { SortDirection } from 'shared/types/common'

import classes from './UsersList.module.scss'
import { getUsersList } from '../../model/selectors/getUsersList/getUsersList'
import { usersListActions } from '../../model/slices/usersListSlice'
import { UsersListOrder } from '../../model/types/usersListSchema'
import { UserInfo } from '../UserInfo/UserInfo'
import { UsersListHead } from '../UsersListHead/UsersListHead'

interface UsersListProps {
  onUserClick?: (userId: string) => void
  className?: string
}

export const UsersList: FC<UsersListProps> = memo((props) => {
  const { onUserClick, className } = props
  const dispatch = useAppDispatch()

  const [sort, setSort] = useState<SortDirection>(SortDirection.DESC)

  const users = useSelector(getUsersList.selectAll)

  const onClick = useCallback(
    (userId: string) => () => onUserClick?.(userId),
    [onUserClick],
  )

  const onSortToggle = useCallback(() => {
    setSort((prevSort) => (prevSort === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC))
  }, [])

  useEffect(() => {
    switch (sort) {
      case SortDirection.ASC:
        dispatch(usersListActions.setListOrder(UsersListOrder.ASC))
        break
      case SortDirection.DESC:
        dispatch(usersListActions.setListOrder(UsersListOrder.DESC))
        break
      default:
        break
    }
    dispatch(usersListActions.setCurrentPageNumber(1))
    dispatch(fetchUsersList())
  }, [dispatch, sort])

  const usersList = useMemo(
    () => users.map((user) => (
      <li
        key={user.id}
        className={classes.UsersListItem}
        onClick={onClick(user.id)}
      >
        <UserInfo className={classes.UserInfo} user={user} />
      </li>
    )),
    [users, onClick],
  )

  return (
    <div className={classNames(classes.UsersListWrapper, {}, [className])}>
      <ul className={classes.UsersList}>
        <UsersListHead
          className={classes.UsersListHead}
          sort={sort}
          onTokensSortToggle={onSortToggle}
        />
        {usersList}
      </ul>
    </div>
  )
})
