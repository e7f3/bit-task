import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getSelectedUser } from 'features/FetchUsersList'
import {
  fetchUserTransactions,
  UserTransactions,
  userTransactionsReducer,
  getUserTransactionsError,
  getUserTransactionsIsLoading,
  TransactionsGraph,
} from 'features/FetchUserTransactions'
import {
  DynamicReducerLoader,
  ReducersList,
} from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { SideDrawer } from 'shared/ui/SideDrawer/SideDrawer'
import { Spinner } from 'shared/ui/Spinner/Spinner'
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
  const isLoading = useSelector(getUserTransactionsIsLoading)
  const error = useSelector(getUserTransactionsError)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserTransactions({ userId: user.id }))
    }
  }, [dispatch, user])

  if (!isOpen || !user) {
    return null
  }

  if (error) {
    return (
      <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
        <SideDrawer
          className={classes.Drawer}
          isOpen={isOpen}
          onClose={onClose}
        >
          <Text variant={TextVariant.BODY_XL_SEMIBOLD}>{error}</Text>
        </SideDrawer>
      </DynamicReducerLoader>
    )
  }

  return (
    <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
      <SideDrawer className={classes.Drawer} isOpen={isOpen} onClose={onClose}>
        {isLoading && <Spinner className={classes.Spinner} />}
        <div className={classes.Transactions} data-testid='transactions'>
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
