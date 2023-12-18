import { FC, SVGProps } from 'react'

interface IconProps {
  icon: FC<SVGProps<SVGSVGElement>>
  className?: string
}

export const Icon: FC<IconProps> = (props) => {
  const {
    icon: IconComponent,

    className,
  } = props

  return (
    <IconComponent
      className={className}
      data-testid='icon'
    />
  )
}
