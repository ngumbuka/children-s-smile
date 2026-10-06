import type { ReactNode } from "react"

/**
 * Building blocks shared by the admin data screens.
 *
 * Every list module renders the same table shell -- an `overflow-x-auto`
 * wrapper, a screen-reader-only caption, an uppercase Montserrat header row on
 * a pale blue band, and status pills or progress bars inside the cells. These
 * components freeze that pattern in one place so a visual tweak (a header
 * colour, a pill radius) lands everywhere at once instead of in six modules.
 */

export type Column = { label: string; width?: string; align?: "left" | "right" }

/** Wraps a list in the standard admin table shell. Pass rows as children. */
export function DataTable({
  caption,
  columns,
  children,
  minWidth = 700,
  className = "",
}: {
  caption: string
  columns: Column[]
  children: ReactNode
  minWidth?: number
  className?: string
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full" style={{ minWidth: `${minWidth}px` }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[rgba(226,231,255,0.5)]">
            {columns.map((column) => (
              <th
                scope="col"
                key={column.label}
                style={column.width ? { width: column.width } : undefined}
                className={`px-4 py-3 font-['Montserrat'] font-bold text-[#424751] text-xs tracking-[0.5px] uppercase ${
                  column.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/**
 * The pale-blue segmented control used to switch between filters: an inline
 * "active tab" white pill over a `#eaedff` rail. Tabs are passed as
 * { key, label } pairs; the label may carry an icon or a live count.
 */
export function SegmentedTabs<T extends string | number>({
  tabs,
  active,
  onChange,
  children,
  className = "",
}: {
  tabs: { key: T; label: ReactNode }[]
  active: T
  onChange: (key: T) => void
  /** Extra controls rendered on the same rail, after the tabs. */
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex max-w-full gap-1 overflow-x-auto rounded-lg bg-[#eaedff] p-1 ${className}`}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.key}
          onClick={() => onChange(tab.key)}
          aria-pressed={active === tab.key}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${
            active === tab.key
              ? "bg-white font-['Inter'] font-bold text-[#004484] shadow-sm"
              : "font-['Inter'] text-[#424751]"
          }`}
        >
          {tab.label}
        </button>
      ))}
      {children}
    </div>
  )
}

/** Rounded status label whose colours come from the row's derived values. */
export function StatusBadge({
  children,
  color,
  background,
  className = "",
}: {
  children: ReactNode
  color: string
  background: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-['Montserrat'] text-xs font-bold ${className}`}
      style={{ color, backgroundColor: background }}
    >
      {children}
    </span>
  )
}

/** Small tracked bar (avancement, alert severity, channel share). */
export function MiniProgress({
  value,
  color,
  className = "",
}: {
  value: number
  color: string
  className?: string
}) {
  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-[#eaedff] ${className}`}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, backgroundColor: color }}
      />
    </div>
  )
}