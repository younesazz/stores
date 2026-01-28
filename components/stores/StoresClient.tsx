"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

type ToastVariant = "success" | "error"

type StoreItem = {
  id: string
  name: string
  subdomain: string
  isActive: boolean
  createdAt: string
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30)
}

export default function StoresClient() {
  const [loading, setLoading] = useState(true)
  const [stores, setStores] = useState<StoreItem[]>([])

  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [form, setForm] = useState({ name: "", subdomain: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // toast
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

  const baseDomain = useMemo(() => {
    // dev: use lvh.me
    return process.env.NODE_ENV === "development" ? "lvh.me:3000" : "flexdz.com"
  }, [])

  async function fetchStores() {
    setLoading(true)
    try {
      const res = await fetch("/api/stores", { cache: "no-store" })
      const json = await res.json()
      setStores(json?.data || [])
    } catch {
      showToast({ variant: "error", title: "Erreur", description: "Impossible de charger les stores" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStores()
  }, [])

  // ESC close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-slate-700"
  const inputErr = input + " border-red-400 focus:ring-red-200"

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Nom requis"
    const sub = (form.subdomain || slugify(form.name)).trim()
    if (!sub) e.subdomain = "Sous-domaine requis"
    if (sub && !/^[a-z0-9-]+$/.test(sub)) e.subdomain = "a-z, 0-9, - فقط"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (k: "name" | "subdomain", v: string) => {
    setForm((p) => {
      const next = { ...p, [k]: v }
      if (k === "name" && !p.subdomain) next.subdomain = slugify(v)
      return next
    })
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }))
  }

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          subdomain: form.subdomain || slugify(form.name),
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Erreur création")

      showToast({
        variant: "success",
        title: "Store créé ✅",
        description: `http://${json.data.subdomain}.${baseDomain}`,
      })

      setOpen(false)
      setForm({ name: "", subdomain: "" })
      await fetchStores()
    } catch (err: any) {
      showToast({ variant: "error", title: "Erreur", description: err?.message || "Échec" })
    } finally {
      setIsSaving(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm("Supprimer ce store ? (products + orders liés seront supprimés)")) return
    try {
      const res = await fetch(`/api/stores/${id}`, { method: "DELETE" })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || "Delete failed")
      showToast({ variant: "success", title: "Supprimé ✅" })
      await fetchStores()
    } catch (err: any) {
      showToast({ variant: "error", title: "Erreur", description: err?.message || "Échec" })
    }
  }

  return (
    <div className="space-y-6">
      {/* toast */}
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
                <p className={["text-sm font-semibold", toast.variant === "success" ? "text-emerald-700" : "text-red-700"].join(" ")}>
                  {toast.title}
                </p>
                {toast.description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.description}</p>}
              </div>
              <button onClick={closeToast} className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* header */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stores</h1>
          <p className="mt-2 text-slate-500">Créez et gérez vos boutiques (subdomains).</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Nouveau store
        </button>
      </div>

      {/* list */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Vos stores</p>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/30" />
              ))}
            </div>
          ) : stores.length === 0 ? (
            <div className="py-12 text-center text-slate-500">Aucun store. Cliquez sur “Nouveau store”.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stores.map((s) => {
                const url = `http://${s.subdomain}.${baseDomain}`
                return (
                  <div key={s.id} className="rounded-2xl border border-slate-200 p-4 hover:shadow-sm transition dark:border-slate-800">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{s.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{s.subdomain}</p>
                      </div>
                      <span className={["text-xs px-2 py-1 rounded-full border",
                        s.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600",
                      ].join(" ")}>
                        {s.isActive ? "Actif" : "Inactif"}
                      </span>
                    </div>

                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-sm font-semibold text-slate-900 hover:underline dark:text-white"
                    >
                      Ouvrir le store →
                    </a>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <Link
                        href={`/dashboard/products?storeId=${s.id}`}
                        className="text-sm font-semibold text-slate-900 hover:underline dark:text-white"
                      >
                        Produits
                      </Link>

                      <button
                        onClick={() => onDelete(s.id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-950"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Créer un store</h2>
                  <p className="mt-1 text-sm text-slate-500">Sous-domaine unique (ex: king19).</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={onCreate} className="mt-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nom *</label>
                  <input value={form.name} onChange={(e) => onChange("name", e.target.value)} className={errors.name ? inputErr : input} />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Sous-domaine *</label>
                  <div className="flex items-center gap-2">
                    <input value={form.subdomain} onChange={(e) => onChange("subdomain", e.target.value)} className={errors.subdomain ? inputErr : input} />
                    <span className="text-sm text-slate-500 whitespace-nowrap">.{baseDomain}</span>
                  </div>
                  {errors.subdomain ? (
                    <p className="text-sm text-red-600">{errors.subdomain}</p>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Preview: <span className="font-semibold">http://{(form.subdomain || slugify(form.name) || "store")}.{baseDomain}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Création..." : "Créer"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
