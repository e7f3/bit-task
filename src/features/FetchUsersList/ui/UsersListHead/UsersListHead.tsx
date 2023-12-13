import { FC, memo } from 'react'

import ArrowIcon from 'shared/assets/icons/arrow-narrow-down.svg'
import { Mods, classNames } from 'shared/lib/utils/classNames/classNames'
import { SortDirection } from 'shared/types/common'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import classes from './UsersListHead.module.scss'

interface UsersListHeadProps {
  onTokensSortToggle?: () => void
  sort?: SortDirection
  className?: string
}

export const UsersListHead: FC<UsersListHeadProps> = memo((props) => {
  const { onTokensSortToggle, className, sort = SortDirection.DESC } = props

  const iconMods: Mods = {
    [classes.AscSort]: sort === SortDirection.ASC,
    [classes.DescSort]: sort === SortDirection.DESC,
  }

  return (
    <div className={classNames(classes.UsersListHead, {}, [className])}>
      <div className={classNames(classes.ColumnTitle, {}, [])}>
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Email
        </Text>
      </div>
      <div className={classNames(classes.ColumnTitle, {}, [])}>
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Имя
        </Text>
      </div>
      <div
        className={classNames(classes.ColumnTitle, {}, [
          classes.ColumnTitleRole,
        ])}
      >
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Роль
        </Text>
      </div>
      <div
        className={classNames(classes.ColumnTitle, {}, [
          classes.ColumnTitleSubscription,
        ])}
      >
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Подписка
        </Text>
      </div>
      <div
        className={classNames(classes.ColumnTitle, {}, [
          classes.ColumnTitleTokens,
        ])}
      >
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Токены
        </Text>
        {onTokensSortToggle && (
          <Button variant={ButtonVariant.IMAGE} onClick={onTokensSortToggle}>
            <Icon
              className={classNames(classes.ArrowIcon, iconMods, [])}
              icon={ArrowIcon}
            />
          </Button>
        )}
      </div>
      <div
        className={classNames(classes.ColumnTitle, {}, [
          classes.ColumnTitleControls,
        ])}
      >
        <Text className={classes.Text} variant={TextVariant.BODY_S_MEDIUM}>
          Действия
        </Text>
      </div>
    </div>
  )
})
