import { FC, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { TransactionType } from 'entities/Transaction'
import { CURRENCY_POSTFIX } from 'shared/consts/common'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import {
  List,
  ListColumnTitle,
  ListElement,
  ListElementMarking,
} from 'shared/ui/List'

import classes from './UserTransactions.module.scss'
import { buildAmountString } from '../../lib/utils/buildAmountString/buildAmountString'
import { buildDateString } from '../../lib/utils/buildDateString/buildDateString'
import { compareTransactionName } from '../../lib/utils/compareTransactionName/comparetransactionName'
import { getUserTransactions } from '../../model/selectors/getUserTransactions/getUserTransactions'

interface UserTransactionsProps {
  className?: string
}

const listColumnTitles: ListColumnTitle[] = [
  {
    id: 'type',
    content: 'Тип',
  },
  {
    id: 'amount',
    content: 'Сумма',
  },
  {
    id: 'date',
    content: 'Дата',
  },
]

export const UserTransactions: FC<UserTransactionsProps> = memo((props) => {
  const { className } = props
  const transactions = useSelector(getUserTransactions.selectAll)

  const listElements = useMemo<ListElement[]>(
    () => transactions.map((transaction) => {
      let amountMarking: ListElementMarking | undefined
      switch (transaction.type) {
        case TransactionType.REPLENISH:
          amountMarking = ListElementMarking.SUCCESS
          break
        case TransactionType.WRITE_OFF:
          amountMarking = ListElementMarking.WARNING
          break
        default:
          amountMarking = ListElementMarking.DEFAULT
      }

      const amount = transaction.type === TransactionType.WRITE_OFF ? -transaction.amount : transaction.amount
      const amountString = buildAmountString(amount, CURRENCY_POSTFIX)

      return {
        id: transaction.id,
        content: [
          { value: compareTransactionName(transaction.type) },
          {
            value: amountString,
            marking: amountMarking,
          },
          { value: buildDateString(new Date(transaction.created_at)) },
        ],
      }
    }),
    [transactions],
  )

  return (
    <div className={classNames(classes.UserTransactions, {}, [className])}>
      <List
        className={classes.TransactionsList}
        elements={listElements}
        columnTitles={listColumnTitles}
        doShrink={false}
      />
    </div>
  )
})
