import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  parentElement?: HTMLElement
  children: ReactNode
}

export const Portal: FC<PortalProps> = (props) => {
  const { children, parentElement = document.body } = props
  return createPortal(children, parentElement)
}
