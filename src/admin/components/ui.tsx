import type { ButtonHTMLAttributes, ReactNode } from "react"
import type { Icon } from "@/components/icons"

type Tone = "blue" | "green" | "red" | "orange" | "neutral"

export function Button({
  children,
  icon: Icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: Icon
  variant?: "primary" | "secondary" | "ghost" | "danger"
}) {
  const variants = {
    primary: "bg-brand text-white shadow-sm hover:bg-brand-strong",
    secondary: "bg-brand-soft text-ink hover:bg-brand-muted",
    ghost: "bg-transparent text-ink hover:bg-brand-soft",
    danger: "bg-danger text-white hover:bg-danger-strong",
  }

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
      {children}
    </button>
  )
}

export function Text({
  children,
  variant = "body",
  className = "",
}: {
  children: ReactNode
  variant?: "display" | "title" | "subtitle" | "body" | "caption" | "label"
  className?: string
}) {
  const variants = {
    display:
      "font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl",
    title: "font-display text-lg font-bold leading-tight text-ink",
    subtitle: "font-display text-sm font-bold text-ink",
    body: "text-sm leading-relaxed text-ink-muted",
    caption: "text-xs leading-relaxed text-ink-subtle",
    label:
      "font-display text-xs font-bold uppercase tracking-wider text-ink-subtle",
  }
  return <div className={`${variants[variant]} ${className}`}>{children}</div>
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white shadow-card ${className}`}
    >
      {children}
    </div>
  )
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: Tone
}) {
  const tones = {
    blue: "bg-brand-soft text-brand",
    green: "bg-success-soft text-success-strong",
    red: "bg-danger-soft text-danger-strong",
    orange: "bg-warning-soft text-warning-strong",
    neutral: "bg-surface-muted text-ink-muted",
  }
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}: {
  label: string
  value: string
  note: string
  icon: Icon
  tone?: Tone
}) {
  const tones = {
    blue: "bg-brand-soft text-brand",
    green: "bg-success-soft text-success-strong",
    red: "bg-danger-soft text-danger-strong",
    orange: "bg-warning-soft text-warning-strong",
    neutral: "bg-surface-muted text-ink-muted",
  }
  return (
    <Card className="flex min-h-36 flex-col justify-between p-4">
      <div className="flex items-start justify-between gap-3">
        <Text variant="label">{label}</Text>
        <div className={`rounded-xl p-2 ${tones[tone]}`}>
          <Icon aria-hidden="true" className="size-4" />
        </div>
      </div>
      <div>
        <Text variant="display" className="text-2xl sm:text-2xl">
          {value}
        </Text>
        <Text variant="caption" className="mt-1">
          {note}
        </Text>
      </div>
    </Card>
  )
}

export function Progress({
  value,
  tone = "blue",
}: {
  value: number
  tone?: "blue" | "green" | "red" | "orange"
}) {
  const tones = {
    blue: "bg-brand",
    green: "bg-success",
    red: "bg-danger",
    orange: "bg-warning",
  }
  return (
    <div className="h-2 overflow-hidden rounded-full bg-brand-soft">
      <div
        className={`h-full rounded-full ${tones[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Text variant="title">{title}</Text>
        {description ? (
          <Text variant="caption" className="mt-1">
            {description}
          </Text>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  trailing,
}: {
  icon: Icon
  title: string
  subtitle?: ReactNode
  trailing?: ReactNode
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <Icon size={20} className="text-[#004484]" />
          <h1 className="font-['Montserrat'] font-bold text-[#131b2e] text-[24px]">
            {title}
          </h1>
        </div>
        {subtitle ? (
          <p className="font-['Inter'] text-[#424751] text-[14px]">{subtitle}</p>
        ) : null}
      </div>
      {trailing}
    </div>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line px-5 py-8 text-center">
      <Text variant="body">{children}</Text>
    </div>
  )
}
