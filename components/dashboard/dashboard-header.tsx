"use client"

import { useState, useRef, useEffect } from "react"
import { signOut } from "next-auth/react"
import { LogOut, Settings, User } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string
    image?: string | null
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  // close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <h2 className="text-xl font-bold text-slate-900">FlexDZ</h2>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition"
            aria-label="User menu"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Avatar"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-700">
                {initials}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition"
                onClick={() => {
                  setOpen(false)
                  // router.push("/profile") if needed
                }}
              >
                <User className="h-4 w-4 text-slate-600" />
                Profil
              </button>

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition"
                onClick={() => {
                  setOpen(false)
                  // router.push("/settings")
                }}
              >
                <Settings className="h-4 w-4 text-slate-600" />
                Paramètres
              </button>

              <div className="border-t border-slate-100" />

              <button
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
