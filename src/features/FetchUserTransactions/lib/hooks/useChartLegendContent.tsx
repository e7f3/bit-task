import { ContentType } from 'recharts/types/component/DefaultLegendContent'

import LegendIcon from 'shared/assets/icons/chart-legend-item.svg'
import ChartMiniIcon from 'shared/assets/icons/chart-mini.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text, TextVariant } from 'shared/ui/Text/Text'

export const useChartLegendContent: (
  dates: string[],
  borderDates: [string, string],
  classes: {
    [className: string]: string
  }
) => ContentType = (dates, borderDates, classes) => (props) => {
  const { payload } = props
  const [leftBorderDate, rightBorderDate] = borderDates
  return (
    <div className={classes.Legend}>
      <div className={classes.LegendDate}>
        {dates.map((date) => (
          <Text
            className={classes.LegendText}
            variant={TextVariant.BODY_S_MEDIUM}
            key={date}
          >
            {date}
          </Text>
        ))}
      </div>
      <div className={classes.LegendChartMini}>
        <Icon icon={ChartMiniIcon} />
        <Text
          className={classes.ChartMiniText}
          variant={TextVariant.BODY_XS_REGULAR}
        >
          {leftBorderDate}
        </Text>
        <Text
          className={classes.ChartMiniText}
          variant={TextVariant.BODY_XS_REGULAR}
        >
          {rightBorderDate}
        </Text>
      </div>
      {payload?.map((entry) => (
        <div key={entry.value} className={classes.LegendItem}>
          <Icon icon={LegendIcon} />
          <Text
            className={classes.LegendText}
            variant={TextVariant.BODY_S_MEDIUM}
          >
            {entry.value}
          </Text>
        </div>
      ))}
    </div>
  )
}
