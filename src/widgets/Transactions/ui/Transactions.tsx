import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getSelectedUser } from 'features/FetchUsersList'
import {
  fetchUserTransactions,
  UserTransactions,
  userTransactionsReducer,
} from 'features/FetchUserTransactions'
import { TransactionsGraph } from 'features/FetchUserTransactions/ui/TransactionsGraph/TransactionsGraph'
import {
  DynamicReducerLoader,
  ReducersList,
} from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { SideDrawer } from 'shared/ui/SideDrawer/SideDrawer'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import classes from './Transactions.module.scss'

interface TransactionsProps {
  isOpen?: boolean
  onClose?: () => void
}

const reducers: ReducersList = {
  userTransactions: userTransactionsReducer,
}

export const Transactions: FC<TransactionsProps> = memo((props) => {
  const { isOpen, onClose } = props
  const dispatch = useAppDispatch()
  const user = useSelector(getSelectedUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserTransactions({ userId: user.id }))
    }
  }, [dispatch, user])

  if (!isOpen || !user) {
    return null
  }

  return (
    <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
      <SideDrawer className={classes.Drawer} isOpen={isOpen} onClose={onClose}>
        <div className={classes.Transactions}>
          <div className={classes.TransactionsHead}>
            <Text variant={TextVariant.BODY_XL_SEMIBOLD}>{user.email}</Text>
          </div>
          <div className={classes.TransactionsGraphWrapper}>
            <Text variant={TextVariant.BODY_XL_SEMIBOLD}>
              Использование токенов
            </Text>
            <TransactionsGraph
              name={user.email}
              className={classes.TransactionsGraph}
              currentAmount={user.subscription.tokens}
            />
          </div>
          <div className={classes.TransactionsListWrapper}>
            <Text variant={TextVariant.BODY_XL_SEMIBOLD}>История операций</Text>
            <UserTransactions className={classes.TransactionsList} />
          </div>
        </div>
      </SideDrawer>
    </DynamicReducerLoader>
  )
})
