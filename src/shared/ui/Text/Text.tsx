import { FC, ReactNode, memo } from 'react'

import { classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './Text.module.scss'

interface TextProps {
  children?: ReactNode
  variant?: TextVariant
  className?: string
}

export enum TextVariant {
  // Headings
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',

  // Common text
  BODY_XS_REGULAR = 'body-xs-regular',
  BODY_S_MEDIUM = 'body-s-medium',
  BODY_M_REGULAR = 'body-m-regular',
  BODY_M_MEDIUM = 'body-m-medium',
  BODY_M_SEMIBOLD = 'body-m-semibold',
  BODY_XL_SEMIBOLD = 'body-xl-semibold',
  BODY_XXL_SEMIBOLD = 'body-xxl-semibold',
}

export const Text: FC<TextProps> = memo((props) => {
  const { children, className, variant = TextVariant.BODY_M_REGULAR } = props

  switch (variant) {
    case TextVariant.H1:
      return (
        <h1
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h1>
      )
    case TextVariant.H2:
      return (
        <h2
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h2>
      )
    case TextVariant.H3:
      return (
        <h3
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h3>
      )
    case TextVariant.H4:
      return (
        <h4
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h4>
      )
    case TextVariant.H5:
      return (
        <h5
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h5>
      )
    case TextVariant.H6:
      return (
        <h6
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </h6>
      )
    default:
      return (
        <p
          className={classNames(classes[variant], {}, [className])}
          data-testid='text'
        >
          {children}
        </p>
      )
  }
})
