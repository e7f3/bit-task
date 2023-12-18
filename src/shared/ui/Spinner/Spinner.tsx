import { FC, memo } from 'react'

import { classNames } from 'shared/lib/utils/classNames/classNames'

import classes from './Spinner.module.scss'

interface SpinnerProps {
  className?: string
}

export const Spinner : FC<SpinnerProps> = memo((props) => {
  const { className } = props
  return (
    <div className={classNames(classes.SpinnerWrapper, {}, [className])}>
      <span className={classes.Spinner} />
    </div>
  )
})
