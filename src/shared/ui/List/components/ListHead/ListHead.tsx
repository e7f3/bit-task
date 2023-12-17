import { FC, memo } from 'react'

import ArrowIcon from 'shared/assets/icons/arrow-narrow-down.svg'
import { Mods, classNames } from 'shared/lib/utils/classNames/classNames'
import { SortDirection } from 'shared/types/common'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { TextVariant, Text } from 'shared/ui/Text/Text'

import classes from './ListHead.module.scss'

function createIconMods(sort: SortDirection): Mods {
  return {
    [classes.AscSort]: sort === SortDirection.ASC,
    [classes.DescSort]: sort === SortDirection.DESC,
  }
}

interface ListHeadProps {
  columnTitles: ListColumnTitle[]
  hasControls?: boolean
  doShrink?: boolean
}

export interface ListColumnTitle {
  id: string
  content: string
  sort?: SortDirection
  sortFunction?: () => void
}

export const ListHead: FC<ListHeadProps> = memo((props) => {
  const { columnTitles, hasControls = false, doShrink = false } = props
  const mods: Mods = {
    [classes.shrink]: doShrink,
  }
  return (
    <div className={classNames(classes.ListHead, mods, [])}>
      {columnTitles.map((title) => (
        <div key={title.id} className={classes.Title}>
          <Text
            className={classes.TitleText}
            variant={TextVariant.BODY_S_MEDIUM}
          >
            {title.content}
          </Text>
          {title.sort && title.sortFunction && (
            <Button variant={ButtonVariant.IMAGE} onClick={title.sortFunction}>
              <Icon
                className={classNames(
                  classes.ArrowIcon,
                  createIconMods(title.sort),
                  [],
                )}
                icon={ArrowIcon}
              />
            </Button>
          )}
        </div>
      ))}
      {hasControls && (
        <div className={classes.Title}>
          <Text
            className={classes.TitleText}
            variant={TextVariant.BODY_S_MEDIUM}
          >
            Действия
          </Text>
        </div>
      )}
    </div>
  )
})
