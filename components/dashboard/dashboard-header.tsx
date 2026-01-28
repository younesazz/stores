"use client"

import { useEffect, useRef, useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { LogOut, Settings, User } from "lucide-react"

export default function DashboardHeader({ user }: { user: { name?: string | null; email?: string; image?: string | null } }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const initials =
    user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"

  // outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  // ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="flex h-16 items-center justify-between px-6">
        <button onClick={() => router.push("/dashboard")} className="text-xl font-bold">
          FlexDZ
        </button>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {user.image ? (
                <img src={user.image} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {initials}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                  onClick={() => {
                    setOpen(false)
                    router.push("/dashboard/profile")
                  }}
                >
                  <User className="h-4 w-4" />
                  Profil
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
                  onClick={() => {
                    setOpen(false)
                    router.push("/dashboard/settings")
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Paramètres
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
