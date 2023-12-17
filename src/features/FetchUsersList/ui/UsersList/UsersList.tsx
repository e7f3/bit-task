import {
  FC, memo, useCallback, useMemo,
} from 'react'
import { useSelector } from 'react-redux'

// eslint-disable-next-line import/no-cycle
import { fetchUsersList } from 'features/FetchUsersList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { SortDirection } from 'shared/types/common'
import { List, ListColumnTitle, ListElement } from 'shared/ui/List'

import classes from './UsersList.module.scss'
import { getUsersList } from '../../model/selectors/getUsersList/getUsersList'
import { getUsersListOrder } from '../../model/selectors/getUsersListOrder/getUsersListOrder'
import { usersListActions } from '../../model/slices/usersListSlice'
import { UsersListOrder } from '../../model/types/usersListSchema'

interface UsersListProps {
  onUserClick?: (userId: string) => void
  className?: string
}

export const UsersList: FC<UsersListProps> = memo((props) => {
  const { onUserClick, className } = props
  const dispatch = useAppDispatch()

  const users = useSelector(getUsersList.selectAll)
  const order = useSelector(getUsersListOrder)

  const onSortToggle = useCallback(() => {
    dispatch(usersListActions.setCurrentPageNumber(1))
    dispatch(
      usersListActions.setListOrder(
        order === UsersListOrder.DESC ? UsersListOrder.ASC : UsersListOrder.DESC,
      ),
    )
    dispatch(fetchUsersList())
  }, [dispatch, order])

  const listColumnTitles = useMemo<ListColumnTitle[]>(
    () => [
      {
        id: 'email',
        content: 'Email',
      },
      {
        id: 'name',
        content: 'Имя',
      },
      {
        id: 'role',
        content: 'Роль',
      },
      {
        id: 'plan',
        content: 'Подписка',
      },
      {
        id: 'tokens',
        content: 'Токены',
        sort:
          order === UsersListOrder.DESC
            ? SortDirection.DESC
            : SortDirection.ASC,
        sortFunction: onSortToggle,
      },
    ],
    [order, onSortToggle],
  )

  const listElements = useMemo<ListElement[]>(
    () => users.map((user) => {
      const plan = user.subscription.plan.type.slice(0, 1).toLocaleUpperCase()
          + user.subscription.plan.type.slice(1).toLocaleLowerCase()
      const tokens = `${user.subscription.tokens} TKN`

      return {
        id: user.id,
        content: [
          { value: user.email },
          { value: user.name },
          { value: user.role },
          { value: plan },
          { value: tokens },
        ],
      }
    }),
    [users],
  )

  return (
    <div className={classNames(classes.UsersListWrapper, {}, [className])}>
      <List
        className={classes.UsersList}
        elements={listElements}
        columnTitles={listColumnTitles}
        onListElementClick={onUserClick}
        hasControls
      />
    </div>
  )
})
