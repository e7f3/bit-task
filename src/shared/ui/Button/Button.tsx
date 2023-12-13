import {
  ButtonHTMLAttributes, FC, ReactNode, memo,
} from 'react'

import { classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  theme?: ButtonTheme
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}

export enum ButtonTheme {
  PRIMARY = 'primary',
  CLEAN = 'clean',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export enum ButtonVariant {
  DEFAULT = 'default',
  ROUND = 'round',
  NO_BORDER = 'no-border',
  IMAGE = 'image',
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    children,
    className,
    theme = ButtonTheme.PRIMARY,
    size = ButtonSize.SMALL,
    variant = ButtonVariant.DEFAULT,
    ...rest
  } = props
  return (
    <button
      className={classNames(classes.Button, {}, [
        classes[theme],
        classes[size],
        classes[variant],
        className,
      ])}
      type='button'
      {...rest}
    >
      {children}
    </button>
  )
})
