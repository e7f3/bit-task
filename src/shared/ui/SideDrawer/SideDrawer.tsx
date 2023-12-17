import {
  FC,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import CloseIcon from 'shared/assets/icons/close.svg'
import { classNames, Mods } from 'shared/lib/utils/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'

import classes from './SideDrawer.module.scss'
import { Button, ButtonVariant } from '../Button/Button'
import { Icon } from '../Icon/Icon'

const CLOSE_DELAY = 200

export interface SideDrawerProps {
  className?: string
  isOpen: boolean
  onClose?: () => void
  lazy?: boolean
  children: ReactNode
}

export const SideDrawer: FC<SideDrawerProps> = (props) => {
  const {
    className, isOpen, onClose, lazy = true, children,
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [wasOpened, setWasOpened] = useState(false)
  const timeoutIdRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsClosing(true)
      timeoutIdRef.current = setTimeout(() => {
        if (onClose) {
          onClose()
        }
        setIsClosing(false)
      }, CLOSE_DELAY)
    }
  }, [onClose, isOpen])

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    if (isOpen && !wasOpened) {
      setWasOpened(true)
    }
  }, [isOpen, wasOpened])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      clearTimeout(timeoutIdRef?.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const mods: Mods = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  }

  if (!wasOpened) {
    return null
  }

  return (
    <Portal>
      <div
        className={classNames(classes.SideDrawer, mods, [className])}
        data-testid='side-drawer-window'
      >
        <div className={classes.overlay} onClick={handleClose}>
          <div className={classes.content} onClick={handleContentClick}>
            <Button
              className={classes.CloseButton}
              variant={ButtonVariant.IMAGE}
              onClick={handleClose}
            >
              <Icon icon={CloseIcon} />
            </Button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
