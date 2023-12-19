import { FC, memo, useCallback } from 'react'

import { Mods, classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './List.module.scss'
import { ListColumnTitle, ListHead } from '../ListHead/ListHead'
import { ListElement, ListItem } from '../ListItem/ListItem'

interface ListProps {
  className?: string
  elements: ListElement[]
  columnTitles?: ListColumnTitle[]
  hasControls?: boolean
  doShrink?: boolean
  onListElementClick?: (id: string) => void
  onListElementDelete?: (id: string) => void
  onListElementEdit?: (id: string) => void
}

export const List: FC<ListProps> = memo((props) => {
  const {
    className,
    elements,
    columnTitles,
    hasControls,
    doShrink = true,
    onListElementClick,
    onListElementDelete,
    onListElementEdit,
  } = props

  const handleListElementClick = useCallback(
    (id: string) => () => onListElementClick?.(id),
    [onListElementClick],
  )

  const handleListElementDelete = useCallback(
    (id: string) => () => onListElementDelete?.(id),
    [onListElementDelete],
  )

  const handleListElementEdit = useCallback(
    (id: string) => () => onListElementEdit?.(id),
    [onListElementEdit],
  )

  const mods: Mods = {
    [classes.shrink]: doShrink,
  }

  if (!elements.length && !columnTitles?.length) {
    return null
  }

  return (
    <ul className={classNames(classes.List, mods, [className])} data-testid='list'>
      {columnTitles && (
        <ListHead
          columnTitles={columnTitles}
          hasControls={hasControls}
          doShrink={doShrink}
        />
      )}
      {elements.map((element) => (
        <ListItem
          key={element.id}
          element={element}
          hasControls={hasControls}
          doShrink={doShrink}
          onClick={handleListElementClick(element.id)}
          onEdit={handleListElementEdit(element.id)}
          onDelete={handleListElementDelete(element.id)}
        />
      ))}
    </ul>
  )
})
