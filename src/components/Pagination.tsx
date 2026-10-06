import { useEffect, useMemo, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "./icons"

/**
 * Pager used wherever a list can outgrow a screen: the backoffice inbox and
 * tables, and the public archives. One shared control keeps the look (round
 * blue pills) and the page-window behaviour consistent across the app.
 *
 * Renders nothing for a single page, so call sites can mount it unconditionally.
 */

export type PaginationProps = {
  /** Current page, 1-based. */
  page: number
  pageCount: number
  onChange: (page: number) => void
  /** Left side, e.g. "Page 2 sur 8 · 78 messages". */
  label?: ReactNode
  className?: string
}

const btn =
  "flex min-h-9 min-w-9 items-center justify-center rounded-full border border-line px-3 text-sm font-semibold text-ink transition hover:border-brand/40 hover:bg-brand-soft disabled:pointer-events-none disabled:opacity-40"

export function Pagination({
  page,
  pageCount,
  onChange,
  label,
  className = "",
}: PaginationProps) {
  if (pageCount <= 1) {
    if (!label) return null
    return (
      <div
        className={`flex items-center justify-between gap-3 pt-1 ${className}`}
      >
        <span className="font-['Inter'] text-xs text-[#727783]">{label}</span>
        <span />
      </div>
    )
  }

  const safePage = Math.min(Math.max(page, 1), pageCount)

  const pages: (number | "…")[] = []
  if (pageCount <= 7) {
    for (let p = 1; p <= pageCount; p += 1) pages.push(p)
  } else {
    const around = [
      1,
      safePage - 1,
      safePage,
      safePage + 1,
      pageCount,
    ].filter((p) => p >= 1 && p <= pageCount)
    const windowed = [...new Set(around)].sort((a, b) => a - b)
    let previous = 0
    for (const p of windowed) {
      if (p - previous > 1) pages.push("…")
      pages.push(p)
      previous = p
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-between gap-3 pt-1 sm:flex-row ${className}`}
    >
      {label ? (
        <span className="font-['Inter'] text-xs text-[#727783]">{label}</span>
      ) : (
        <span />
      )}
      <nav
        aria-label="Pagination"
        className="flex flex-wrap items-center justify-center gap-1.5"
      >
        <button
          type="button"
          aria-label="Page précédente"
          disabled={safePage === 1}
          onClick={() => onChange(safePage - 1)}
          className={btn}
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((entry, index) =>
          entry === "…" ? (
            <span
              key={`gap-${index}`}
              className="px-1 font-['Inter'] text-xs text-[#727783]"
            >
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              aria-current={entry === safePage ? "page" : undefined}
              onClick={() => onChange(entry)}
              className={`${btn} ${
                entry === safePage
                  ? "border-brand bg-brand font-bold text-white"
                  : ""
              }`}
            >
              {entry}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Page suivante"
          disabled={safePage === pageCount}
          onClick={() => onChange(safePage + 1)}
          className={btn}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  )
}

/** Clamps a page number so a shrinking list never leaves "page 4 of 2". */
export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 1), Math.max(pageCount, 1))
}

/**
 * Owns the page state for a paginated list: clamps when the list shrinks,
 * resets to page 1 whenever `resetKey` changes (switch tab, apply a filter,
 * type in a search box), and returns the page's slice ready to render.
 */
export function usePagination<T>(
  items: readonly T[],
  pageSize: number,
  resetKey?: unknown,
): {
  page: number
  pageCount: number
  pageItems: T[]
  setPage: (page: number) => void
} {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))

  useEffect(() => {
    setPage((current) => clampPage(current, pageCount))
  }, [pageCount])

  useEffect(() => {
    setPage(1)
  }, [resetKey])

  const safePage = clampPage(page, pageCount)
  const pageItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize],
  )
  return { page: safePage, pageCount, pageItems, setPage }
}