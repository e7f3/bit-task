import { Transaction, TransactionType } from 'entities/Transaction'
import { MS_IN_DAY } from 'shared/consts/common'

import { buildDateString } from '../buildDateString/buildDateString'

interface ReturnedValue {
  data: Record<string, string | number>[]
  dates: string[]
  borderDates: [string, string]
}

export function createGraphData(
  transactions: Transaction[],
  balance: number,
  timeSpan: number,
  dataKey: string,
): ReturnedValue {
  //  Filter transactions by timeSpan
  try {
    const currentDate = Date.now()
    const dates = new Set<string>()
    const index = transactions.findIndex((transaction) => {
      dates.add(buildDateString(new Date(transaction.created_at), 'short'))
      return (
        new Date(currentDate).getTime()
          - new Date(transaction.created_at).getTime()
        <= timeSpan
      )
    })
    const borderDates: [string, string] = [
      buildDateString(new Date(currentDate), 'xshort'),
      buildDateString(new Date(currentDate), 'xshort'),
    ]
    let amount = balance
    const data = [
      {
        name: buildDateString(new Date(currentDate)),
        [dataKey]: balance,
      },
      ...transactions.slice(index).map((transaction) => {
        amount
          -= transaction.type === TransactionType.WRITE_OFF
            ? -transaction.amount
            : transaction.amount
        return {
          name: buildDateString(new Date(transaction.created_at)),
          [dataKey]: amount,
        }
      }),
    ].reverse()
    return { data, dates: Array.from(dates).reverse(), borderDates }
  } catch (e) {
    console.log(e)
    return { data: [], dates: [], borderDates: ['', ''] }
  }
}
