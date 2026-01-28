"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

type ToastVariant = "success" | "error"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  // ✅ simple toast (no UI libs)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        showToast({
          variant: "error",
          title: "Erreur de connexion",
          description: result.error,
        })
        return
      }

      if (result?.ok) {
        showToast({
          variant: "success",
          title: "Connexion réussie",
          description: "Redirection en cours...",
        })

        const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard"
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      showToast({
        variant: "error",
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const registered = searchParams?.get("registered")

  const inputBase =
    "w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2"
  const inputOk = `${inputBase} border-slate-200 focus:ring-slate-300`

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Toast */}
      {toast.open && (
        <div className="fixed top-4 right-4 z-50 w-[92vw] max-w-sm">
          <div
            className={[
              "rounded-2xl border p-4 shadow-lg bg-white",
              toast.variant === "success" ? "border-emerald-200" : "border-red-200",
            ].join(" ")}
            role="status"
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
                {toast.description && (
                  <p className="mt-1 text-sm text-slate-600">{toast.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={closeToast}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center">Connexion</h1>
          <p className="mt-2 text-center text-slate-600">
            Accédez à votre tableau de bord
          </p>

          {registered && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-sm text-emerald-800">
                ✓ Compte créé avec succès ! Connectez-vous maintenant.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={inputOk}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Mot de passe
                </label>
                <Link href="/forgot-password" className="text-sm text-slate-900 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className={inputOk}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Nouveau sur FlexDZ ?</span>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
