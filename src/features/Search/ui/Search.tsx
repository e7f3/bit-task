import { FC } from 'react'

import SearchIcon from 'shared/assets/icons/search-circle.svg'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { Input, InputBadgePosition } from 'shared/ui/Input/Input'

import classes from './Search.module.scss'

interface SearchProps {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export const Search: FC<SearchProps> = (props) => {
  const {
    value, onChange, error, className,
  } = props
  return (
    <Input
      className={classNames(classes.Search, {}, [className])}
      value={value}
      onChange={onChange}
      placeholder='Поиск'
      hasError={Boolean(error)}
      errorText={error}
      badge={SearchIcon}
      badgePosition={InputBadgePosition.LEFT}
    />
  )
}
