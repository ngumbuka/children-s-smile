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
 * else (local UI state, a parent) does not recompute the query, and
 * `useSyncExternalStore` still guarantees the value returned is the one the
 * committed render saw.
 */

import { useCallback, useRef, useSyncExternalStore } from "react"
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

  const cache = useRef<{ revision: number; value: T } | null>(null)

  const getSnapshot = useCallback(() => {
    const revision = getRevision()
    const cached = cache.current
    if (cached && cached.revision === revision) return cached.value
    const value = computeRef.current()
    cache.current = { revision, value }
    return value
  }, [])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
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
