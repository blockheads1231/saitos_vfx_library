import type {ComponentType, ReactNode} from "react"
import {useRef, useEffect, useCallback} from "react"

let lastTouchStart = 0

type APIItemProps = {
  name: string
  kind?: "Property" | "Method" | "Event" | "Callback"
  icon?: ComponentType<{ size?: number; className?: string }>
  type?: string
  signature?: string
  defaultValue?: string
  readOnly?: boolean
  deprecated?: boolean
  children: ReactNode
}

const PropertyIcon = () => (
  <img src="/icons/property_icon.svg" alt="" height={20} width={20} />
)
const MethodIcon = () => (
  <img src="/icons/method_icon.svg" alt="" height={24} width={24} />
)
const EventIcon = () => (
  <img src="/icons/event_icon.svg" alt="" height={16} width={16} />
)
const CallbackIcon = () => (
  <img src="/icons/callback_icon.svg" alt="" height={24} width={24} />
)

const kindConfig = {
  Property: { icon: PropertyIcon, gradient: "from-sky-500 via-blue-500 to-indigo-500"},
  Method: { icon: MethodIcon, gradient: "from-fuchsia-400 via-pink-500 to-purple-600"},
  Event: { icon: EventIcon, gradient: "from-yellow-400 via-amber-400 to-orange-500"},
  Callback: { icon: CallbackIcon, gradient: "from-violet-500 via-purple-500 to-pink-500"},
}

export default function APIItem({
  name,
  kind = "Property",
  icon,
  type,
  signature,
  defaultValue,
  readOnly = false,
  deprecated = false,
  children,
}: APIItemProps) {
  const { icon: KindIcon, gradient } = kindConfig[kind]
  const Icon = icon ?? KindIcon
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    const details = detailsRef.current
    const body = bodyRef.current
    const inner = innerRef.current

    if (!details || !body || !inner) return
    if (!details.hasAttribute("open")) return

    requestAnimationFrame(() => {
      body.style.gridTemplateRows = "0fr"
      inner.style.opacity = "0"
      inner.style.transform = "translateY(8px)"
    })
    
    body.addEventListener(
      "transitionend",
      () => {details.removeAttribute("open")},
      { once: true }
    )

    setTimeout(() => {
      details.removeAttribute("open")
    }, 350)
  }, [])

  const open = useCallback(() => {
  const details = detailsRef.current
  const body = bodyRef.current
  const inner = innerRef.current
  if (!details || !body || !inner) return
  if (details.hasAttribute("open")) return

  details.setAttribute("open", "")
  requestAnimationFrame(() => {
    body.style.gridTemplateRows = "1fr"
    inner.style.opacity = "1"
    inner.style.transform = "translateY(0)"
  })
}, [])

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (e.ctrlKey || e.metaKey) return
    if (!detailsRef.current?.contains(e.target as Node)) {
      close()
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    lastTouchStart = Date.now()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (Date.now() - lastTouchStart >= 350) {
      if (detailsRef.current?.contains(e.target as Node)) open()
      return
    }
    if (!detailsRef.current?.contains(e.target as Node)) {
      close()
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  document.addEventListener("touchstart", handleTouchStart)
  document.addEventListener("touchend", handleTouchEnd)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
    document.removeEventListener("touchstart", handleTouchStart)
    document.removeEventListener("touchend", handleTouchEnd)
  }
}, [close, open])

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const details = detailsRef.current
    const body = bodyRef.current
    const inner = innerRef.current
    if (!details || !body || !inner) return

    if (!details.hasAttribute("open")) {
      open()
    } else {
      close()
    }
  }

  return (
    <details
      ref={detailsRef}
      className="
      group bg-white dark:bg-zinc-900
      overflow-hidden
      mt-1 rounded-2xl

      transition-colors

      [&+details]:mt-0
      [&+details]:rounded-t-none
      "
      style={{filter: 'var(--mode-adaptive-filter)', border: '1px solid rgb(57, 57, 57)'}}
      >
      <div className={`h-1 w-full bg-gradient-to-r ${gradient} animate-gradient`} />

      <summary
        className="flex cursor-pointer list-none items-center gap-2 px-2 py-2"
        onClick={handleToggle}>
          
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {Icon && (
            <span
              className={
                icon
                  ? "shrink-0 text-zinc-700 dark:text-zinc-200"
                  : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              }>
              <Icon size={18} />
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <code className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {name}
              </code>
              {signature && (
                <code className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {signature}
                </code>
              )}
              {type && (
                <span className="ml-auto shrink-0 rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  {type}
                </span>
              )}
            </div>
          </div>
        </div>
      </summary>
      
      <div
        ref={bodyRef}
        style={{gridTemplateRows: "0fr"}}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out">
        <div className="overflow-hidden">
          <div
            ref={innerRef}
            style={{ opacity: 0, transform: "translateY(8px)" }}
            className="transition-all duration-300 ease-in-out">
            <div className="border-t border-zinc-200 px-2 py-3 dark:border-zinc-800">
              <div className="prose prose-zinc max-w-none dark:prose-invert" style={{filter: 'var(--mode-adaptive-filter)',}}>
                {children}
              </div>

              {(defaultValue || readOnly || deprecated) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {defaultValue && (
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      Default: <code>{defaultValue}</code>
                    </span>
                  )}
                  {readOnly && (
                    <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      ReadOnly
                    </span>
                  )}
                  {deprecated && (
                    <span className="rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300">
                      Deprecated
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </details>
  )
}