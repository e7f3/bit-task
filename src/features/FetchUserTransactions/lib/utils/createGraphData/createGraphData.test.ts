import { Transaction, TransactionStatus, TransactionType } from 'entities/Transaction'
import { MS_IN_DAY } from 'shared/consts/common'
import { Currency } from 'shared/types/common'

import { createGraphData } from './createGraphData'

const mockedTransactions: Transaction[] = [
  {
    id: '220fce95-07ad-4518-9c28-98560c8c720c',
    provider: 'SYSTEM',
    amount: 140212,
    currency: Currency.SYSTEM_TOKEN,
    meta: null,
    status: TransactionStatus.PENDING,
    type: TransactionType.WRITE_OFF,
    plan_id: null,
    user_id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
    referral_id: null,
    created_at: '2023-12-18T08:00:00.691Z',
    external_id: null,
  },
  {
    id: '6cb6a822-7759-490b-8d69-73a42c596e58',
    provider: 'SYSTEM',
    amount: 195569,
    currency: Currency.SYSTEM_TOKEN,
    meta: null,
    status: TransactionStatus.PENDING,
    type: TransactionType.REPLENISH,
    plan_id: null,
    user_id: 'cb7bde4f-3f3d-443f-8df8-b6da7e92598b',
    referral_id: null,
    created_at: '2023-12-18T07:50:00.966Z',
    external_id: null,
  },
]

describe('createGraphData', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(0))
  })
  test('Transactions array is empty', () => {
    // My timezone is +4, so test may fail if you have another timezone
    const transactions: Transaction[] = []
    const balance = 0
    const timeSpan = MS_IN_DAY
    const dataKey = 'amount'

    const result = createGraphData(transactions, balance, timeSpan, dataKey)

    expect(result.data.length).toEqual(1)
    expect(result.data[0]).toHaveProperty(dataKey, balance)
    expect(result.data[0]).toHaveProperty('name', '01.01.70, 04:00:00')
  })

  test('Transactions array is not empty', () => {
    const transactions: Transaction[] = mockedTransactions
    const balance = 500000
    const timeSpan = MS_IN_DAY
    const dataKey = 'amount'

    const result = createGraphData(transactions, balance, timeSpan, dataKey)
    const expectedResult = [
      {
        name: '18.12.23, 11:50:00',
        amount: 444643,
      },
      {
        name: '18.12.23, 12:00:00',
        amount: 640212,
      },
      {
        name: '01.01.70, 04:00:00',
        amount: 500000,
      },
    ]

    expect(result.data.length).toEqual(transactions.length + 1)
    expect(result.data[result.data.length - 1]).toHaveProperty(dataKey, balance)
    expect(result.data).toEqual(expectedResult)

    expect(result.dates.length).toEqual(1)
  })
})
