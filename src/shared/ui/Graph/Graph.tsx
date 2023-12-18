import { FC, memo, useCallback } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  YAxis,
} from 'recharts'
import { ContentType } from 'recharts/types/component/DefaultLegendContent'

import classes from './Graph.module.scss'

interface GraphProps {
  curveName: string
  data: Record<string, number | string>[]
  legend: ContentType
}

export const Graph: FC<GraphProps> = memo((props) => {
  const { curveName, data, legend } = props

  const tickTextFormatter = useCallback(
    (value: unknown) =>
    // Big numbers that was formatted with spaces are to long
    // buildAmountString(value as number)
     value as string,
    [],
  )
  return (
    <div className={classes.Graph}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='fillGradient' x1='0' y1='-1' x2='0' y2='1'>
              <stop stopColor='#1C64F2' />
              <stop offset='1' stopColor='#1C64F2' stopOpacity='0.2' />
            </linearGradient>
          </defs>
          <YAxis
            yAxisId='right'
            orientation='right'
            tickFormatter={tickTextFormatter}
            tickCount={6}
            width={60}
          />
          <Legend content={legend} wrapperStyle={{ bottom: '0' }} />
          <Area
            yAxisId='right'
            dataKey={curveName}
            strokeWidth={2}
            dot={false}
            fill='url(#fillGradient)'
          />
          <CartesianGrid />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})
