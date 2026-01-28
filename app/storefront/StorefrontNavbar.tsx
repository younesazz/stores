"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type Props = {
  store: {
    id: string
    name: string
    subdomain: string
    logo: string | null
    currency: string
  }
}

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    return Array.isArray(cart) ? cart.reduce((a, i) => a + (i.quantity || 1), 0) : 0
  } catch {
    return 0
  }
}

export default function StorefrontNavbar({ store }: Props) {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const refresh = () => setCount(getCartCount())
    refresh()
    window.addEventListener("storage", refresh)
    window.addEventListener("cart:update", refresh as any)
    return () => {
      window.removeEventListener("storage", refresh)
      window.removeEventListener("cart:update", refresh as any)
    }
  }, [])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onEsc)
    return () => document.removeEventListener("keydown", onEsc)
  }, [])

  const basePath = useMemo(() => `/storefront/${store.subdomain}`, [store.subdomain])

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={`${basePath}`} className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border bg-white grid place-items-center overflow-hidden">
            {store.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={store.logo} alt={store.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-extrabold" style={{ color: "var(--store-primary)" }}>
                {store.name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <div className="leading-tight">
            <p className="font-bold">{store.name}</p>
            <p className="text-xs text-slate-500">Boutique en ligne</p>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#categories" className="text-slate-700 hover:text-slate-900">Catégories</a>
          <a href="#products" className="text-slate-700 hover:text-slate-900">Produits</a>
          <Link href={`${basePath}/cart`} className="relative">
            <span className="text-slate-700 hover:text-slate-900">Panier</span>
            {count > 0 && (
              <span
                className="absolute -top-2 -right-3 min-w-4.5 h-4.5 rounded-full text-[11px] px-1 grid place-items-center text-white"
                style={{ backgroundColor: "var(--store-primary)" }}
              >
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-3">
            <a onClick={() => setOpen(false)} href="#categories" className="block rounded-xl border p-3 font-semibold">
              Catégories
            </a>
            <a onClick={() => setOpen(false)} href="#products" className="block rounded-xl border p-3 font-semibold">
              Produits
            </a>
            <Link onClick={() => setOpen(false)} href={`${basePath}/cart`} className="block rounded-xl border p-3 font-semibold">
              Panier {count > 0 ? `(${count})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
