/**
 * Client-side per-page metadata.
 *
 * This is a client-rendered SPA, so meta tags cannot come from the server per
 * route: the shell in `index.html` carries the site-wide defaults, and each
 * page publishes its own <title>, description and Open Graph copies through
 * this hook the moment it mounts. Dynamic pages (article, project) feed the
 * fields the backoffice edits, so shared links and search results read the
 * right copy for every story.
 */

import { useEffect } from "react"

const canonicalHost = "https://childrensmile.cm"

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector =
    attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`
  let element = document.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    if (attr === "name") element.name = key
    else element.setAttribute("property", key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertLink(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement("link")
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

export function usePageMeta(
  title: string,
  description: string,
  ogType: "website" | "article" = "website",
) {
  useEffect(() => {
    const url = `${canonicalHost}${window.location.pathname}${window.location.search}`
    document.title = title
    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:type", ogType)
    upsertMeta("property", "og:locale", "fr_FR")
    upsertMeta("property", "og:url", url)
    upsertLink("canonical", url)
  }, [title, description, ogType])
}