import {
  FC, memo, useCallback, useMemo,
} from 'react'

import Arrow from 'shared/assets/icons/arrow-narrow-left.svg'
import { classNames } from 'shared/lib/utils/classNames/classNames'
import { Button, ButtonTheme, ButtonVariant } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

import classes from './Pagination.module.scss'
import { calculateArrayLength } from '../lib/calculateArrayLength/calculateArrayLength'
import { calculatePageNumber } from '../lib/calculatePageNumber/calculatePageNumber'

interface PaginationProps {
  totalPages: number
  currentPage: number
  visiblePages?: number
  onPageChange: (page: number) => void
  className?: string
}

const VISIBLE_PAGE_COUNT = 3

export const Pagination: FC<PaginationProps> = memo((props) => {
  const {
    totalPages,
    currentPage,
    visiblePages = VISIBLE_PAGE_COUNT,
    onPageChange,
    className,
  } = props

  const onCLickArrowLeft = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  const onCLickArrowRight = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }, [currentPage, onPageChange, totalPages])

  const onPageClick = useCallback(
    (pageNumber: number) => () => onPageChange(pageNumber),
    [onPageChange],
  )

  const [hasLeftEllipsis, hasRightEllipsis] = useMemo<
    [boolean, boolean]
  >(() => {
    if (totalPages - visiblePages <= 2) {
      return [false, false]
    }
    return [
      currentPage > visiblePages,
      totalPages - currentPage >= visiblePages,
    ]
  }, [currentPage, totalPages, visiblePages])

  const content = useMemo(
    // Create an array of length visiblePages or totalPages - first - last
    () =>
      Array.from(
        {
          length: calculateArrayLength(visiblePages, totalPages),
        },
        (_, index) => {
          // Calculate the page number
          const pageNumber = calculatePageNumber(
            totalPages,
            visiblePages,
            currentPage,
            index,
            hasLeftEllipsis,
            hasRightEllipsis,
          )
          return (
            <Button
              key={index}
              theme={
                currentPage === pageNumber
                  ? ButtonTheme.PRIMARY
                  : ButtonTheme.CLEAN
              }
              variant={ButtonVariant.NO_BORDER}
              onClick={onPageClick(pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        },
      ),
    [
      hasLeftEllipsis,
      hasRightEllipsis,
      currentPage,
      visiblePages,
      onPageClick,
      totalPages,
    ],
  )

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={classNames(classes.Pagination, {}, [className])} data-testid='pagination'>
      <Button
        className={classes.ArrowButton}
        theme={ButtonTheme.CLEAN}
        variant={ButtonVariant.NO_BORDER}
        onClick={onCLickArrowLeft}
        disabled={currentPage === 1}
      >
        <Icon icon={Arrow} />
      </Button>
      <Button
        theme={currentPage === 1 ? ButtonTheme.PRIMARY : ButtonTheme.CLEAN}
        variant={ButtonVariant.NO_BORDER}
        onClick={onPageClick(1)}
      >
        1
      </Button>
      {hasLeftEllipsis && (
        <Button
          theme={ButtonTheme.CLEAN}
          variant={ButtonVariant.NO_BORDER}
          disabled
        >
          ...
        </Button>
      )}

      {content}

      {hasRightEllipsis && (
        <Button
          theme={ButtonTheme.CLEAN}
          variant={ButtonVariant.NO_BORDER}
          disabled
        >
          ...
        </Button>
      )}
      <Button
        theme={
          currentPage === totalPages ? ButtonTheme.PRIMARY : ButtonTheme.CLEAN
        }
        variant={ButtonVariant.NO_BORDER}
        onClick={onPageClick(totalPages)}
      >
        {totalPages}
      </Button>
      <Button
        className={classes.ArrowButton}
        theme={ButtonTheme.CLEAN}
        variant={ButtonVariant.NO_BORDER}
        onClick={onCLickArrowRight}
        disabled={currentPage === totalPages}
      >
        <Icon className={classes.RotatedArrow} icon={Arrow} />
      </Button>
    </nav>
  )
})
