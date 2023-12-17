import {
  FC, memo, useCallback, useEffect, useState,
} from 'react'

import { fetchUsersList, usersListActions } from 'features/FetchUsersList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { Text, TextVariant } from 'shared/ui/Text/Text'
import { Transactions } from 'widgets/Transactions'
import { Users } from 'widgets/Users'

import classes from './MainPage.module.scss'

export const MainPage: FC = memo(() => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onUserClick = useCallback(
    (userId: string) => {
      // dispatch(userTransactionsActions.setUserId(userId))
      dispatch(usersListActions.setSelectedUser(userId))
      setIsOpen(true)
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(fetchUsersList())
  }, [dispatch])

  return (
    <div className={classNames('page', {}, [classes.MainPage])}>
      <div className={classes.PageInfo}>
        <Text
          className={classes.PageText}
          variant={TextVariant.BODY_XL_SEMIBOLD}
        >
          Моя организация
        </Text>
      </div>
      <Users onUserClick={onUserClick} />
      {isOpen && <Transactions isOpen={isOpen} onClose={onClose} />}
    </div>
  )
})
