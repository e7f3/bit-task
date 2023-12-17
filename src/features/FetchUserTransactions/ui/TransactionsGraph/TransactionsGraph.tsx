import { FC, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { TransactionType } from 'entities/Transaction'
import { MS_IN_DAY } from 'shared/consts/common'
import { classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './TransactionsGraph.module.scss'
import { buildDateString } from '../../lib/buildDateString/buildDateString'
import { getUserTransactions } from '../../model/selectors/getUserTransactions/getUserTransactions'

interface TransactionsGraphProps {
  className?: string
  currentAmount: number
  name: string
}

export const TransactionsGraph: FC<TransactionsGraphProps> = memo((props) => {
  const { className, currentAmount, name } = props
  const transactions = useSelector(getUserTransactions.selectAll)

  const graphData = useMemo(() => {
    const currentDate = Date.now()
    const index = transactions.findIndex(
      (transaction) => new Date(currentDate).getTime()
          - new Date(transaction.created_at).getTime()
        <= MS_IN_DAY,
    )
    let amount = currentAmount
    return [
      {
        name: buildDateString(new Date(currentDate)),
        [name]: currentAmount,
      },
      ...transactions.slice(index).map((transaction) => {
        amount
          -= transaction.type === TransactionType.WRITE_OFF
            ? -transaction.amount
            : transaction.amount
        return {
          name: buildDateString(new Date(transaction.created_at)),
          [name]: amount,
        }
      }),
    ].reverse()
  }, [transactions, currentAmount, name])

  console.log(graphData)
  return (
    <div className={classNames(classes.TransactionsGraph, {}, [className])}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={300} height={100} data={graphData}>
          <XAxis dataKey='date' />
          <YAxis yAxisId='right' orientation='right' />
          <Legend />
          <Line
            yAxisId='right'
            dataKey={name}
            stroke='#8884d8'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})
