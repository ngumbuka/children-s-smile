import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import type { IconName } from '../Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'warn' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconPosition?: 'left' | 'right'
  block?: boolean
  className?: string
}

type ButtonAsLink = BaseProps & { to: string; href?: never; onClick?: never } & React.ComponentProps<typeof Link>
type ButtonAsAnchor = BaseProps & { href: string; to?: never; onClick?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonAsButton = BaseProps & { to?: never; href?: never; onClick?: React.MouseEventHandler<HTMLButtonElement> } & React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    block,
    className = '',
    to,
    href,
    onClick,
    ...rest
  } = props

  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : 'btn-md'
  const variantClass =
    variant === 'warn' ? 'btn-warn' : variant === 'secondary' ? 'btn-secondary' : variant === 'ghost' ? 'btn-ghost' : 'btn-primary'

  const iconEl = icon ? <Icon name={icon} /> : null
  const content = (
    <>
      {icon && iconPosition === 'left' ? iconEl : null}
      <span className="btn-label">{children}</span>
      {icon && iconPosition === 'right' ? iconEl : null}
    </>
  )

  const base = `btn ${sizeClass} ${variantClass}${block ? ' btn-block' : ''} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={base} {...(rest as any)}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={base} {...(rest as any)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={base} {...(rest as any)}>
      {content}
    </button>
  )
}
