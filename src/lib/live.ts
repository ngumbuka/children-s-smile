/**
 * Live reads from the shared store.
 *
 * The public site and the `/admin` backoffice are separate React trees, so
 * neither can re-render the other by passing props. They stay in step by
 * subscribing to the store instead: a write anywhere bumps the store's
 * revision, and every live view re-runs its query against the same
 * collections.
 *
 * The snapshot is cached per revision, so a re-render caused by something
 * else (local UI state, a parent) does not recompute the query, and the value
 * is always worked out during the render that returns it.
 */

import { useEffect, useReducer, useRef } from "react"
import { getRevision, isSeeded, subscribe } from "./db"

/**
 * Returns `compute()` re-evaluated whenever the store changes.
 *
 * `compute` must be a pure read of the store: no Promises, no `Date.now()`
 * side effects. It is called once per store revision, and its result is
 * cached until the next write.
 */
export function useLiveValue<T>(compute: () => T): T {
  // Held in a ref so an inline arrow keeps a stable subscription.
  const computeRef = useRef(compute)
  computeRef.current = compute

  const cache = useRef<{ revision: number; value: T } | undefined>(undefined)

  // A store write must reach the view even when the snapshot at that instant
  // would already have been served in the same revision; an explicit
  // subscription to the store's notify list forces exactly one re-render.
  const [, forceRender] = useReducer((x: number) => x + 1, 0)
  useEffect(() => subscribe(forceRender), [])

  const revision = getRevision()
  const cached = cache.current
  if (!cached || cached.revision !== revision) {
    cache.current = { revision, value: computeRef.current() }
    return cache.current.value
  }
  return cached.value
}

/**
 * True once the store's initialiser has run.
 *
 * Seeding is asynchronous, so a live read during the first render would
 * otherwise see empty collections and publish "no projects" for a frame. Views
 * that must not flash an empty state gate on this.
 */
export function useStoreReady(key = "core"): boolean {
  return useLiveValue(() => isSeeded(key))
}
