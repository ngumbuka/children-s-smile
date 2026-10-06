import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { CheckCircle2, Info, X } from "@/components/icons"
import type { PageKey } from "./Layout"

type NoticeTone = "success" | "info"

type NoticeDetail = {
  message: string
  tone?: NoticeTone
}

const NOTICE_EVENT = "csc:notice"
const NAVIGATE_EVENT = "csc:navigate"
export function notify(message: string, tone: NoticeTone = "success") {
  window.dispatchEvent(
    new CustomEvent<NoticeDetail>(NOTICE_EVENT, {
      detail: { message, tone },
    }),
  )
}

export function navigateTo(page: PageKey) {
  window.dispatchEvent(
    new CustomEvent<PageKey>(NAVIGATE_EVENT, { detail: page }),
  )
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8",
  })
  downloadBlob(filename, blob)
}

export function downloadCsv(
  filename: string,
  rows: Array<Record<string, string | number | boolean | null>>,
) {
  if (!rows.length) {
    notify("Aucune donnée à exporter.", "info")
    return
  }

  const headers = Object.keys(rows[0])
  const escape = (value: unknown) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`
  const csv = [
    headers.map(escape).join(";"),
    ...rows.map((row) =>
      headers.map((header) => escape(row[header])).join(";"),
    ),
  ].join("\n")
  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8",
  })
  downloadBlob(filename, blob)
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
  notify(`Téléchargement de « ${filename} » lancé.`)
}

export function FeedbackHost() {
  const [notice, setNotice] = useState<NoticeDetail | null>(null)

  useEffect(() => {
    let timeout: number | undefined
    const handleNotice = (event: Event) => {
      const customEvent = event as CustomEvent<NoticeDetail>
      setNotice(customEvent.detail)
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => setNotice(null), 4200)
    }

    window.addEventListener(NOTICE_EVENT, handleNotice)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener(NOTICE_EVENT, handleNotice)
    }
  }, [])

  if (!notice) return null

  const Icon = notice.tone === "info" ? Info : CheckCircle2

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[80] flex items-center gap-3 rounded-2xl border border-[#e2e7ff] bg-white px-4 py-3 text-sm font-semibold text-[#131b2e] shadow-[0_16px_40px_rgba(19,27,46,0.18)] sm:left-auto sm:max-w-md"
    >
      <Icon
        aria-hidden="true"
        className={notice.tone === "info" ? "text-[#004484]" : "text-[#006e2d]"}
        size={18}
      />
      <span className="flex-1">{notice.message}</span>
      <button
        type="button"
        aria-label="Fermer la notification"
        onClick={() => setNotice(null)}
        className="flex size-9 items-center justify-center rounded-full text-[#727783] hover:bg-[#f2f3ff]"
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  )
}

export function CreateDialog({
  open,
  title,
  label,
  placeholder,
  submitLabel = "Créer le brouillon",
  initialValue = "",
  onClose,
  onSubmit,
}: {
  open: boolean
  title: string
  label: string
  placeholder?: string
  submitLabel?: string
  initialValue?: string
  onClose: () => void
  onSubmit: (value: string) => void
}) {
  const [value, setValue] = useState("")
  const inputId = useId()

  useEffect(() => {
    setValue(open ? initialValue : "")
  }, [initialValue, open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextValue = value.trim()
    if (!nextValue) return
    onSubmit(nextValue)
    setValue("")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#131b2e]/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        className="w-full max-w-lg rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_24px_80px_rgba(19,27,46,0.24)]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p
              id={`${inputId}-title`}
              className="font-['Montserrat'] text-xl font-bold text-[#131b2e]"
            >
              {title}
            </p>
            <p className="mt-1 text-sm text-[#727783]">
              Le nouvel élément sera enregistré comme brouillon.
            </p>
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#727783] hover:bg-[#f2f3ff]"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <form onSubmit={submit}>
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-[#424751]"
          >
            {label}
          </label>
          <input
            id={inputId}
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            className="min-h-12 w-full rounded-2xl border border-[#e2e7ff] bg-white px-4 text-sm text-[#131b2e] outline-none focus:border-[#004484]"
          />
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-full bg-[#f2f3ff] px-4 text-sm font-semibold text-[#424751] hover:bg-[#e2e7ff]"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!value.trim()}
              className="min-h-11 rounded-full bg-[#004484] px-4 text-sm font-bold text-white hover:bg-[#003467] disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function DetailDialog({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#131b2e]/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_24px_80px_rgba(19,27,46,0.24)]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <p
            id={titleId}
            className="font-['Montserrat'] text-xl font-bold text-[#131b2e]"
          >
            {title}
          </p>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#727783] hover:bg-[#f2f3ff]"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export type EntityFormValue = string | boolean

export type EntityFormField = {
  name: string
  label: string
  type?: "text" | "number" | "email" | "url" | "tel" | "date" | "textarea" | "richtext" | "select" | "checkbox"
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
  step?: number | "any"
  pattern?: string
  options?: string[]
  help?: string
}

export function EntityFormDialog({
  open,
  title,
  description,
  fields,
  initialValues = {},
  submitLabel = "Enregistrer",
  onClose,
  onSubmit,
}: {
  open: boolean
  title: string
  description?: string
  fields: EntityFormField[]
  initialValues?: Record<string, EntityFormValue>
  submitLabel?: string
  onClose: () => void
  onSubmit: (
    values: Record<string, EntityFormValue>,
  ) => void | boolean | Promise<void | boolean>
}) {
  const [values, setValues] =
    useState<Record<string, EntityFormValue>>(initialValues)
  const titleId = useId()

  useEffect(() => {
    if (open) setValues(initialValues)
  }, [initialValues, open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const sanitizedValues = { ...values }
    fields
      .filter((field) => field.type === "richtext")
      .forEach((field) => {
        sanitizedValues[field.name] = sanitizeRichText(
          String(values[field.name] ?? ""),
        )
      })
    // Returning `false` keeps the dialog open. A handler that writes to the
    // store may answer with a promise, in which case the dialog stays open
    // until the write resolves and closes only if it succeeded.
    const result = onSubmit(sanitizedValues)
    if (result instanceof Promise) {
      void result.then((settled) => {
        if (settled !== false) onClose()
      })
    } else if (result !== false) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#131b2e]/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#e2e7ff] bg-white p-5 shadow-[0_24px_80px_rgba(19,27,46,0.24)] sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p
              id={titleId}
              className="font-['Montserrat'] text-xl font-bold text-[#131b2e]"
            >
              {title}
            </p>
            {description ? (
              <p className="mt-1 text-sm leading-relaxed text-[#727783]">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#727783] hover:bg-[#f2f3ff]"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const fieldId = `${titleId}-${field.name}`
              const value =
                values[field.name] ?? (field.type === "checkbox" ? false : "")
              const sharedClassName =
                "min-h-11 w-full rounded-xl border border-[#e2e7ff] bg-white px-3 text-sm text-[#131b2e] outline-none transition focus:border-[#004484]"

              return (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "sm:col-span-2" : ""}
                >
                  {field.type === "checkbox" ? (
                    <label
                      htmlFor={fieldId}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-[#f2f3ff] px-3 text-sm font-semibold text-[#424751]"
                    >
                      <input
                        id={fieldId}
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [field.name]: event.target.checked,
                          }))
                        }
                        className="size-4 accent-[#004484]"
                      />
                      {field.label}
                    </label>
                  ) : (
                    <>
                      <label
                        htmlFor={fieldId}
                        className="mb-1.5 block text-sm font-semibold text-[#424751]"
                      >
                        {field.label}
                        {field.required ? (
                          <span
                            className="ml-1 text-[#ba1a1a]"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        ) : null}
                      </label>
                      {field.type === "richtext" ? (
                        <RichTextEditor
                          id={fieldId}
                          value={String(value)}
                          required={field.required}
                          placeholder={field.placeholder}
                          onChange={(nextValue) =>
                            setValues((current) => ({
                              ...current,
                              [field.name]: nextValue,
                            }))
                          }
                        />
                      ) : field.type === "textarea" ? (
                        <textarea
                          id={fieldId}
                          required={field.required}
                          value={String(value)}
                          placeholder={field.placeholder}
                          onChange={(event) =>
                            setValues((current) => ({
                              ...current,
                              [field.name]: event.target.value,
                            }))
                          }
                          rows={4}
                          className={`${sharedClassName} resize-y py-3`}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={fieldId}
                          required={field.required}
                          value={String(value)}
                          onChange={(event) =>
                            setValues((current) => ({
                              ...current,
                              [field.name]: event.target.value,
                            }))
                          }
                          className={sharedClassName}
                        >
                          <option value="">Sélectionner…</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={fieldId}
                          type={field.type ?? "text"}
                          required={field.required}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          pattern={field.pattern}
                          value={String(value)}
                          placeholder={field.placeholder}
                          onChange={(event) =>
                            setValues((current) => ({
                              ...current,
                              [field.name]: event.target.value,
                            }))
                          }
                          className={sharedClassName}
                        />
                      )}
                      {field.help ? (
                        <p className="mt-1 text-xs text-[#727783]">
                          {field.help}
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-[#727783]">
            Les champs marqués d’un astérisque sont obligatoires.
          </p>
          <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-full bg-[#f2f3ff] px-4 text-sm font-semibold text-[#424751] hover:bg-[#e2e7ff]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="min-h-11 rounded-full bg-[#004484] px-5 text-sm font-bold text-white hover:bg-[#003467]"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const allowedRichTextTags = new Set([
  "P",
  "BR",
  "STRONG",
  "B",
  "EM",
  "I",
  "U",
  "UL",
  "OL",
  "LI",
  "A",
])

export function sanitizeRichText(value: string) {
  if (typeof window === "undefined") return value
  const documentNode = new DOMParser().parseFromString(value, "text/html")
  documentNode.body.querySelectorAll("*").forEach((element) => {
    if (!allowedRichTextTags.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes))
      return
    }
    Array.from(element.attributes).forEach((attribute) => {
      const allowedLinkAttribute =
        element.tagName === "A" &&
        (attribute.name === "href" ||
          attribute.name === "target" ||
          attribute.name === "rel")
      if (!allowedLinkAttribute) element.removeAttribute(attribute.name)
    })
    if (element.tagName === "A") {
      const href = element.getAttribute("href") ?? ""
      if (!/^(https?:|mailto:)/i.test(href)) element.removeAttribute("href")
      element.setAttribute("rel", "noopener noreferrer")
      element.setAttribute("target", "_blank")
    }
  })
  return documentNode.body.innerHTML
}

function RichTextEditor({
  id,
  value,
  required,
  placeholder,
  onChange,
}: {
  id: string
  value: string
  required?: boolean
  placeholder?: string
  onChange: (value: string) => void
}) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = editorRef.current
    if (
      editor &&
      document.activeElement !== editor &&
      editor.innerHTML !== value
    ) {
      editor.innerHTML = value
    }
  }, [value])

  const runCommand = (command: string) => {
    editorRef.current?.focus()
    document.execCommand(command)
    onChange(editorRef.current?.innerHTML ?? "")
  }

  const controls = [
    { command: "bold", label: "Gras", symbol: "G" },
    { command: "italic", label: "Italique", symbol: "I" },
    { command: "underline", label: "Souligné", symbol: "S" },
    { command: "insertUnorderedList", label: "Liste à puces", symbol: "•" },
    { command: "insertOrderedList", label: "Liste numérotée", symbol: "1." },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e7ff] bg-white focus-within:border-[#004484]">
      <div
        className="flex flex-wrap gap-1 border-b border-[#e2e7ff] bg-[#f2f3ff] p-2"
        aria-label="Outils de mise en forme"
      >
        {controls.map((control) => (
          <button
            key={control.command}
            type="button"
            aria-label={control.label}
            title={control.label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => runCommand(control.command)}
            className="flex size-9 items-center justify-center rounded-lg text-xs font-bold text-[#424751] hover:bg-white hover:text-[#004484]"
          >
            {control.symbol}
          </button>
        ))}
      </div>
      <div
        id={id}
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-required={required}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-36 px-4 py-3 text-sm leading-relaxed text-[#131b2e] outline-none empty:before:pointer-events-none empty:before:text-[#727783] empty:before:content-[attr(data-placeholder)] [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc"
      />
    </div>
  )
}

export function RichTextContent({
  html,
  className = "",
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={`text-sm leading-relaxed text-[#424751] [&_a]:font-semibold [&_a]:text-[#004484] [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  )
}

export const flowEvents = {
  navigate: NAVIGATE_EVENT,
}
