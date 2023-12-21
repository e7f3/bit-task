import {
  FC, memo, useCallback, useMemo, useState,
} from 'react'
import { useSelector } from 'react-redux'

import { createGraphData } from 'features/FetchUserTransactions/lib/utils/createGraphData/createGraphData'
import { MS_IN_DAY } from 'shared/consts/common'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { Graph } from 'shared/ui/Graph/Graph'

import classes from './TransactionsGraph.module.scss'
import { useChartLegendContent } from '../../lib/hooks/useChartLegendContent'
import { getUserTransactions } from '../../model/selectors/getUserTransactions/getUserTransactions'

interface TransactionsGraphProps {
  className?: string
  currentAmount: number
  name: string
}

export const TransactionsGraph: FC<TransactionsGraphProps> = memo((props) => {
  const { className, currentAmount, name } = props
  const transactions = useSelector(getUserTransactions.selectAll)
  const [transactionsDates, setTransactionsDates] = useState<string[]>([])
  const [borderDates, setBorderDates] = useState<[string, string]>(['', ''])

  const graphData = useMemo(() => {
    const { data, dates, borderDates } = createGraphData(
      transactions,
      currentAmount,
      MS_IN_DAY,
      name,
    )
    setTransactionsDates(dates)
    setBorderDates(borderDates)
    return data
  }, [transactions, currentAmount, name])

  const legendContent = useChartLegendContent(
    transactionsDates,
    borderDates,
    classes,
  )

  return (
    <div className={classNames(classes.TransactionsGraph, {}, [className])} data-testid='transactions-graph'>
      <Graph data={graphData} legend={legendContent} curveName={name} />
    </div>
  )
})
