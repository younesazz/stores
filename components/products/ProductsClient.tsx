"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Plus, Search, X, Image as ImageIcon } from "lucide-react"
import { formatPrice } from "@/lib/utils"

type StoreOption = { id: string; name: string }

type ProductRow = {
  id: string
  name: string
  price: number
  quantity: number
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | string
  storeId: string
  storeName: string
  createdAt: string | Date
  featuredImage?: string | null
  imagesCount?: number
}

function StatusBadge({ status }: { status: string }) {
  const s = (status || "DRAFT").toUpperCase()

  const map: Record<string, { label: string; cls: string }> = {
    PUBLISHED: {
      label: "Publié",
      cls: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
    },
    DRAFT: {
      label: "Brouillon",
      cls: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    },
    ARCHIVED: {
      label: "Archivé",
      cls: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200",
    },
  }

  const v = map[s] ?? map.DRAFT

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${v.cls}`}>
      {v.label}
    </span>
  )
}

export default function ProductsClient({
  products,
  stores,
}: {
  products: ProductRow[]
  stores: StoreOption[]
}) {
  const [q, setQ] = useState("")
  const [storeId, setStoreId] = useState("all")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 10

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()

    return products.filter((p) => {
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.storeName.toLowerCase().includes(query)

      const matchStore = storeId === "all" || p.storeId === storeId
      const matchStatus = status === "all" || String(p.status).toUpperCase() === status

      return matchQuery && matchStore && matchStatus
    })
  }, [products, q, storeId, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const reset = () => {
    setQ("")
    setStoreId("all")
    setStatus("all")
    setPage(1)
  }

  const input =
    "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Produits</h1>
          <p className="mt-2 text-slate-500">Gérez vos produits, images et stock.</p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setPage(1)
                }}
                placeholder="Rechercher produit / boutique..."
                className={`${input} pl-9`}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <select
              value={storeId}
              onChange={(e) => {
                setStoreId(e.target.value)
                setPage(1)
              }}
              className={input}
            >
              <option value="all">Toutes les boutiques</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
              className={input}
            >
              <option value="all">Tous les statuts</option>
              <option value="PUBLISHED">Publié</option>
              <option value="DRAFT">Brouillon</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>

          {(q || storeId !== "all" || status !== "all") && (
            <div className="lg:col-span-12 flex items-center justify-between pt-2">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {filtered.length} résultats
              </p>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <X className="h-4 w-4" />
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Liste des produits
          </p>
          <p className="text-xs text-slate-500">
            Page {currentPage} / {totalPages}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <Package className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="font-medium text-slate-900 dark:text-white">Aucun produit</p>
            <p className="mt-2 text-sm">Ajoutez votre premier produit.</p>
            <Link
              href="/dashboard/products/new"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr className="text-left text-slate-600 dark:text-slate-300">
                    <th className="px-4 py-3 font-medium">Produit</th>
                    <th className="px-4 py-3 font-medium">Boutique</th>
                    <th className="px-4 py-3 font-medium">Prix</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Images</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((p) => (
                    <tr key={p.id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                            {p.featuredImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.featuredImage} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-4 w-4 text-slate-400" />
                            )}
                          </div>

                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{p.name}</div>
                            <div className="text-xs text-slate-500">
                              {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{p.storeName}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {formatPrice(p.price)}
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{p.quantity}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
                        {p.imagesCount ?? 0}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden p-4 space-y-3">
              {paginated.map((p) => (
                <div key={p.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.storeName}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3">
                      <p className="text-xs text-slate-500">Prix</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{formatPrice(p.price)}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3">
                      <p className="text-xs text-slate-500">Stock</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.quantity}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(p.createdAt).toLocaleDateString("fr-FR")}</span>
                    <span>Images: {p.imagesCount ?? 0}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs text-slate-500">
                {filtered.length} total • {PAGE_SIZE} / page
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
