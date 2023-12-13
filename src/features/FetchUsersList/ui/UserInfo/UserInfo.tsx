import { FC, memo, useCallback } from 'react'

import EditIcon from 'shared/assets/icons/edit.svg'
import TrashIcon from 'shared/assets/icons/trash.svg'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { isString } from 'shared/lib/utils/isString/isString'
import { Button, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import classes from './UserInfo.module.scss'
import { User } from '../../../../entities/User/model/types/user'

interface UserInfoProps {
  user: User
  className?: string
  onEditClick?: (userId: string) => void
  onDeleteClick?: (userId: string) => void
}

export const UserInfo: FC<UserInfoProps> = memo((props) => {
  const {
    user, onDeleteClick, onEditClick, className,
  } = props
  const {
    email, name, role, subscription, id,
  } = user

  const { tokens, plan } = subscription
  const { type } = plan

  const subscriptionType = isString(type)
    && type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase()
  const tokensCount = `${tokens} TKN`

  const handleEditClick = useCallback(
    (userId: string) => () => onEditClick?.(userId),
    [onEditClick],
  )
  const handleDeleteClick = useCallback(
    (userId: string) => () => onDeleteClick?.(userId),
    [onDeleteClick],
  )

  return (
    <div className={classNames(classes.UserInfo, {}, [className])}>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoEmail,
        ])}
      >
        <Text
          className={classes.UserInfoText}
          variant={TextVariant.BODY_S_MEDIUM}
        >
          {email}
        </Text>
      </div>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoName,
        ])}
      >
        <Text
          className={classes.UserInfoText}
          variant={TextVariant.BODY_S_MEDIUM}
        >
          {name}
        </Text>
      </div>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoRole,
        ])}
      >
        <Text
          className={classes.UserInfoText}
          variant={TextVariant.BODY_S_MEDIUM}
        >
          {role}
        </Text>
      </div>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoSubscriptionType,
        ])}
      >
        <Text
          className={classes.UserInfoText}
          variant={TextVariant.BODY_S_MEDIUM}
        >
          {subscriptionType}
        </Text>
      </div>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoTokens,
        ])}
      >
        <Text
          className={classes.UserInfoText}
          variant={TextVariant.BODY_S_MEDIUM}
        >
          {tokensCount}
        </Text>
      </div>
      <div
        className={classNames(classes.UserInfoField, {}, [
          classes.UserInfoControls,
        ])}
      >
        <Button onClick={handleEditClick(id)} variant={ButtonVariant.IMAGE}>
          <Icon icon={EditIcon} />
        </Button>
        <Button onClick={handleDeleteClick(id)} variant={ButtonVariant.IMAGE}>
          <Icon icon={TrashIcon} />
        </Button>
      </div>
    </div>
  )
})
