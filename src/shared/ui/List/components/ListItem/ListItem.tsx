import { FC, memo } from 'react'

import EditIcon from 'shared/assets/icons/edit.svg'
import TrashIcon from 'shared/assets/icons/trash.svg'
import { Mods, classNames } from 'shared/lib/utils/classNames/classNames'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { TextVariant, Text } from 'shared/ui/Text/Text'

import classes from './ListItem.module.scss'

function createTextMods(marking?: ListElementMarking): Mods {
  return {
    [classes.success]: marking === ListElementMarking.SUCCESS,
    [classes.warning]: marking === ListElementMarking.WARNING,
  }
}

interface ListItemProps {
  element: ListElement
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  hasControls?: boolean
  doShrink?: boolean
}

export interface ListElement {
  id: string
  content: ListElementContent[]
}

export interface ListElementContent {
  value: string
  marking?: ListElementMarking
}

export enum ListElementMarking {
  DEFAULT = 'default',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export const ListItem: FC<ListItemProps> = memo((props) => {
  const {
    element,
    onClick,
    onEdit,
    onDelete,
    hasControls = false,
    doShrink = false,
  } = props

  const mods: Mods = {
    [classes.shrink]: doShrink,
  }
  return (
    <li
      className={classNames(classes.ListItem, mods, [])}
      onClick={onClick}
      data-testid='list-item'
    >
      {element.content.map((content) => (
        <div key={content.value} className={classes.ListItemContent} data-testid='list-item-content'>
          <Text
            className={classNames(
              classes.ListText,
              createTextMods(content.marking),
              [],
            )}
            variant={TextVariant.BODY_S_MEDIUM}
          >
            {content.value}
          </Text>
        </div>
      ))}
      {hasControls && (
        <div className={classes.ListItemContent} data-testid='list-item-controls'>
          <Button onClick={onEdit} variant={ButtonVariant.IMAGE}>
            <Icon icon={EditIcon} />
          </Button>
          <Button onClick={onDelete} variant={ButtonVariant.IMAGE}>
            <Icon icon={TrashIcon} />
          </Button>
        </div>
      )}
    </li>
  )
})
