import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  SVGProps,
  useId,
  useMemo,
} from 'react'

import { Mods, classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './Input.module.scss'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  onChange?: (value: string) => void
  errorText?: string
  hasError?: boolean
  label?: string
  id?: string
  badge?: FC<SVGProps<SVGSVGElement>>
  badgePosition?: InputBadgePosition
}

export enum InputBadgePosition {
  LEFT = 'BadgeLeft',
  RIGHT = 'BadgeRight',
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    onChange,
    errorText,
    hasError,
    label,
    id,
    badge: Badge,
    badgePosition = InputBadgePosition.LEFT,
    ...rest
  } = props

  const newId = useId()

  const labelId = useMemo(() => id || newId, [id, newId])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  const mods: Mods = {
    [classes.HasBadgeLeft]: Boolean(Badge) && badgePosition === InputBadgePosition.LEFT,
    [classes.HasBadgeRight]: Boolean(Badge) && badgePosition === InputBadgePosition.RIGHT,
  }

  return (
    <div className={className}>
      {label && (
        <label className={classes.Label} htmlFor={labelId} data-testid='input-label'>
          {label}
        </label>
      )}
      <div className={classes.InputWrapper}>
        <input
          className={classNames(classes.Input, mods, [])}
          onChange={handleChange}
          id={labelId}
          required={hasError}
          data-testid='input'
          {...rest}
        />
        {Badge && (
          <Badge
            className={classNames(classes.Badge, {}, [classes[badgePosition]])}
            data-testid='input-badge'
          />
        )}
      </div>
      {hasError && <span className={classes.ErrorText} data-testid='input-error'>{errorText}</span>}
    </div>
  )
}
