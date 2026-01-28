"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { slugify } from "@/lib/slug"

type StoreOpt = { id: string; name: string }
type CatOpt = { id: string; name: string; storeId: string }

type ToastVariant = "success" | "error"

export default function NewProductClient({
  stores,
  categories,
}: {
  stores: StoreOpt[]
  categories: CatOpt[]
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    open: boolean
    variant: ToastVariant
    title: string
    description?: string
  }>({ open: false, variant: "success", title: "" })

  const closeToast = () => setToast((t) => ({ ...t, open: false }))
  const showToast = (payload: Omit<typeof toast, "open">) => {
    setToast({ open: true, ...payload })
    window.clearTimeout((showToast as any)._t)
    ;(showToast as any)._t = window.setTimeout(() => closeToast(), 3500)
  }

  const [form, setForm] = useState({
    storeId: stores[0]?.id ?? "",
    categoryId: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    comparePrice: "",
    quantity: "0",
    status: "DRAFT",
    featuredImage: "",
    imagesText: "", // newline separated
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const catsForStore = useMemo(() => {
    return categories.filter((c) => c.storeId === form.storeId)
  }, [categories, form.storeId])

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-slate-700"
  const inputErr = input + " border-red-400 focus:ring-red-200"

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.storeId) e.storeId = "Choisissez une boutique"
    if (!form.name.trim()) e.name = "Nom requis"
    if (!form.price || Number.isNaN(Number(form.price))) e.price = "Prix invalide"
    if (form.slug && !/^[a-z0-9\u0600-\u06FF-]+$/i.test(form.slug)) e.slug = "Slug invalide"
    if (Number(form.quantity) < 0) e.quantity = "Stock invalide"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (k: string, v: string) => {
    setForm((p) => {
      const next = { ...p, [k]: v }
      if (k === "name" && !p.slug) next.slug = slugify(v)
      if (k === "storeId") next.categoryId = "" // reset category if store changed
      return next
    })
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      const images = form.imagesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeId: form.storeId,
          categoryId: form.categoryId || null,
          name: form.name,
          slug: form.slug || form.name,
          description: form.description || null,
          price: Number(form.price),
          comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
          quantity: Number(form.quantity || 0),
          status: form.status,
          featuredImage: form.featuredImage || null,
          images,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Erreur création produit")

      showToast({ variant: "success", title: "Produit créé ✅", description: "Redirection..." })
      router.push("/dashboard/products")
      router.refresh()
    } catch (err: any) {
      showToast({ variant: "error", title: "Erreur", description: err?.message || "Échec" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Toast */}
      {toast.open && (
        <div className="fixed top-4 right-4 z-50 w-[92vw] max-w-sm">
          <div
            className={[
              "rounded-2xl border p-4 shadow-lg bg-white dark:bg-slate-950",
              toast.variant === "success" ? "border-emerald-200" : "border-red-200",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={[
                    "text-sm font-semibold",
                    toast.variant === "success" ? "text-emerald-700" : "text-red-700",
                  ].join(" ")}
                >
                  {toast.title}
                </p>
                {toast.description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.description}</p>}
              </div>
              <button
                onClick={closeToast}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nouveau produit</h1>
          <p className="mt-2 text-slate-500">Créez un produit (prix, stock, images, statut).</p>
        </div>
        <Link href="/dashboard/products" className="text-sm font-semibold text-slate-900 hover:underline dark:text-white">
          ← Retour
        </Link>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Boutique *</label>
            <select value={form.storeId} onChange={(e) => onChange("storeId", e.target.value)} className={errors.storeId ? inputErr : input}>
              <option value="">Choisir...</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.storeId && <p className="text-sm text-red-600">{errors.storeId}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Catégorie</label>
            <select value={form.categoryId} onChange={(e) => onChange("categoryId", e.target.value)} className={input} disabled={!form.storeId}>
              <option value="">Aucune</option>
              {catsForStore.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nom *</label>
            <input value={form.name} onChange={(e) => onChange("name", e.target.value)} className={errors.name ? inputErr : input} />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Slug</label>
            <input value={form.slug} onChange={(e) => onChange("slug", e.target.value)} className={errors.slug ? inputErr : input} />
            {errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Prix (DZD) *</label>
            <input value={form.price} onChange={(e) => onChange("price", e.target.value)} className={errors.price ? inputErr : input} />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Prix barré</label>
            <input value={form.comparePrice} onChange={(e) => onChange("comparePrice", e.target.value)} className={input} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Stock</label>
            <input value={form.quantity} onChange={(e) => onChange("quantity", e.target.value)} className={errors.quantity ? inputErr : input} />
            {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Statut</label>
            <select value={form.status} onChange={(e) => onChange("status", e.target.value)} className={input}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Featured image (URL)</label>
            <input value={form.featuredImage} onChange={(e) => onChange("featuredImage", e.target.value)} className={input} placeholder="https://..." />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea value={form.description} onChange={(e) => onChange("description", e.target.value)} className={input} rows={4} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Images (URLs) — une par ligne</label>
          <textarea value={form.imagesText} onChange={(e) => onChange("imagesText", e.target.value)} className={input} rows={4} placeholder="https://...\nhttps://..." />
          <p className="text-xs text-slate-500">يتم حفظها في `images: String[]` داخل Prisma.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Création..." : "Créer le produit"}
        </button>
      </form>
    </motion.div>
  )
}
