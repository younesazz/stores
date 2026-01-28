"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type Cat = { id: string; name: string; slug: string }
type Prod = {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number | null
  featuredImage: string | null
  images: string[]
  quantity: number
  categoryId: string | null
}

export default function ProductGrid({
  store,
  categories,
  initialProducts,
}: {
  store: { id: string; currency: string; subdomain: string }
  categories: Cat[]
  initialProducts: Prod[]
}) {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<string>("all")

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return initialProducts.filter((p) => {
      const okQ = !qq || p.name.toLowerCase().includes(qq)
      const okC = cat === "all" || p.categoryId === cat
      return okQ && okC
    })
  }, [q, cat, initialProducts])

  function addToCart(p: Prod) {
    const key = `cart:${store.subdomain}`
    const cart = JSON.parse(localStorage.getItem(key) || "[]")

    const existing = cart.find((x: any) => x.productId === p.id)
    if (existing) existing.quantity += 1
    else cart.push({ productId: p.id, name: p.name, price: p.price, quantity: 1 })

    localStorage.setItem(key, JSON.stringify(cart))
    window.dispatchEvent(new Event("cart:update"))
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3 flex-col sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher..."
            className="w-full sm:w-80 rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          />

          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full sm:w-56 rounded-2xl border px-4 py-3 text-sm bg-white"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-slate-500">{filtered.length} résultat(s)</p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-slate-500">
          Aucun produit.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const img = p.featuredImage || p.images?.[0] || "/placeholder.png"
            const out = p.quantity <= 0
            return (
              <div key={p.id} className="group rounded-3xl border bg-white overflow-hidden hover:shadow-md transition">
                <div className="relative aspect-4/3 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition" />
                  {out && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 border px-3 py-1 text-xs font-semibold text-red-700">
                      Rupture
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <Link
                    href={`/storefront/${store.subdomain}/product/${p.slug}`}
                    className="block font-semibold text-slate-900 hover:underline line-clamp-2"
                  >
                    {p.name}
                  </Link>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg font-extrabold" style={{ color: "var(--store-primary)" }}>
                        {p.price.toLocaleString()} {store.currency}
                      </p>
                      {p.comparePrice ? (
                        <p className="text-sm text-slate-400 line-through">
                          {p.comparePrice.toLocaleString()}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <button
                    disabled={out}
                    onClick={() => addToCart(p)}
                    className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--store-primary)" }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
