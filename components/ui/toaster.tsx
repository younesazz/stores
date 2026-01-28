"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type ToastVariant = "success" | "error" | "info"

type Toast = {
  id: number
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

type ToastContextType = {
  toast: (t: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Record<number, any>>({})

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }

  const toast = (t: Omit<Toast, "id">) => {
    const id = Date.now()
    const duration = t.duration ?? 3500

    setToasts((prev) => [...prev, { ...t, id }])

    timers.current[id] = setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  // ⌨️ ESC closes all toasts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToasts([])
        Object.values(timers.current).forEach(clearTimeout)
        timers.current = {}
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] w-[92vw] max-w-sm space-y-3">
        {toasts.map((t) => {
          const variantClasses =
            t.variant === "success"
              ? "border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200"
              : t.variant === "error"
              ? "border-red-300 dark:border-red-900 text-red-800 dark:text-red-200"
              : "border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200"

          return (
            <div
              key={t.id}
              className={`
                animate-[toast-in_0.25s_ease-out]
                rounded-2xl border bg-white dark:bg-slate-950
                p-4 shadow-lg ${variantClasses}
              `}
              role="status"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.description && (
                    <p className="mt-1 text-sm opacity-80">
                      {t.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeToast(t.id)}
                  className="rounded-lg px-2 py-1 text-sm opacity-60 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider />")
  }
  return ctx
}
