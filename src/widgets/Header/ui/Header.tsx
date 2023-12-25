import { FC, memo } from 'react'

import BriefcaseIcon from 'shared/assets/icons/briefcase.svg'
import AvatarIcon from 'shared/assets/icons/default-avatar.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text, TextVariant } from 'shared/ui/Text/Text'

import classes from './Header.module.scss'

export const Header: FC = memo(() => (
  <div className={classes.Header} data-testid='header'>
    <Text className={classes.LogoText} variant={TextVariant.BODY_XL_SEMIBOLD}>BitTest</Text>
    <div className={classes.Organization}>
      <div className={classes.OrgIconWrapper}>
        <Icon icon={BriefcaseIcon} />
      </div>
      <Text className={classes.OrgName} variant={TextVariant.BODY_M_MEDIUM}>
        Моя организация
      </Text>
    </div>
    <div className={classes.Auth}>
      <Icon className={classes.UserIcon} icon={AvatarIcon} />
      <Text className={classes.AuthText} variant={TextVariant.BODY_XS_REGULAR}>
        Вы авторизованы
      </Text>
      <Text className={classes.UserName} variant={TextVariant.BODY_S_MEDIUM}>
        Администратор
      </Text>
    </div>
  </div>
))
