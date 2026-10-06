/**
 * Funding meter shared by project cards, detail pages and the backoffice.
 *
 * The value comes from the caller so the same component can render a
 * stored total or a live one. It is a `progressbar` with the ARIA
 * value attributes, since the bar is the only thing conveying the
 * ratio to a screen reader.
 */

type Props = {
  value: number
  raised: number
  target: number
  /** Donors see "68%", the backoffice sees the absolute figures. */
  showAmounts?: boolean
  size?: "sm" | "md"
  className?: string
}

const FR = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })

const compact = (n: number) => {
  if (n >= 1_000_000) return `${FR.format(Math.round(n / 1_000_000))} M`
  if (n >= 1_000) return `${FR.format(Math.round(n / 1_000))} k`
  return FR.format(n)
}

export function ProgressMeter({
  value,
  raised,
  target,
  showAmounts = false,
  size = "md",
  className = "",
}: Props) {
  const clamped = Math.max(0, Math.min(100, value))
  const complete = clamped >= 100

  return (
    <div className={className}>
      {showAmounts ? (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-h4 text-brand-900">{compact(raised)} FCFA</span>
          <span className="text-small text-brand-700">
            sur {compact(target)}
          </span>
        </div>
      ) : null}

      <div
        className={`mt-2 w-full overflow-hidden rounded-pill bg-brand-200 ${
          size === "sm" ? "h-1.5" : "h-2.5"
        }`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Financement : ${clamped} %`}
      >
        <div
          className={`h-full rounded-pill transition-[width] duration-500 ${
            complete ? "bg-accent-700" : "bg-warn-700"
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
