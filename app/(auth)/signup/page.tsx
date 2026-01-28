"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type ToastVariant = "success" | "error"

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 20)
}

export default function SignUpPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    tenantName: "",
    subdomain: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const previewUrl = useMemo(() => {
    const sub = formData.subdomain || "votre-sous-domaine"
    return `${sub}.flexdz.com`
  }, [formData.subdomain])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const next = { ...prev, [name]: value }

      // Auto-generate subdomain from tenantName if subdomain empty
      if (name === "tenantName" && !prev.subdomain) {
        next.subdomain = slugify(value)
      }

      return next
    })

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = "Prénom requis"
    if (!formData.lastName) newErrors.lastName = "Nom requis"
    if (!formData.email) newErrors.email = "Email requis"
    if (!formData.phone) newErrors.phone = "Téléphone requis"

    if (!formData.password) newErrors.password = "Mot de passe requis"
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Au moins 8 caractères"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (!formData.tenantName) newErrors.tenantName = "Nom de l'entreprise requis"
    if (!formData.subdomain) newErrors.subdomain = "Sous-domaine requis"
    if (formData.subdomain && !/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = "Uniquement lettres minuscules, chiffres et tirets"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          tenantName: formData.tenantName,
          subdomain: formData.subdomain,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || "Erreur lors de l'inscription")
      }

      showToast({
        variant: "success",
        title: "Compte créé avec succès !",
        description: `Votre sous-domaine: ${json?.data?.subdomain ?? formData.subdomain}.flexdz.com`,
      })

      router.push("/login?registered=true")
    } catch (err: any) {
      showToast({
        variant: "error",
        title: "Erreur",
        description: err?.message || "Une erreur est survenue",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2"
  const inputOk = `${inputBase} border-slate-200 focus:ring-slate-300`
  const inputErr = `${inputBase} border-red-500 focus:ring-red-200`

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

      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center">Créer votre boutique</h1>
          <p className="mt-2 text-center text-slate-600">
            Commencez à vendre en ligne en quelques minutes
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Infos personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                  Prénom *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? inputErr : inputOk}
                />
                {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                  Nom *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? inputErr : inputOk}
                />
                {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? inputErr : inputOk}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Téléphone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0555123456"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? inputErr : inputOk}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Mot de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Mot de passe *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? inputErr : inputOk}
                />
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirmer *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? inputErr : inputOk}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Infos boutique */}
            <div className="mt-4 border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-slate-900 mb-4">
                Informations de votre boutique
              </h3>

              <div className="space-y-2">
                <label htmlFor="tenantName" className="text-sm font-medium text-slate-700">
                  Nom de l'entreprise *
                </label>
                <input
                  id="tenantName"
                  name="tenantName"
                  type="text"
                  placeholder="Ma Boutique"
                  value={formData.tenantName}
                  onChange={handleChange}
                  className={errors.tenantName ? inputErr : inputOk}
                />
                {errors.tenantName && <p className="text-sm text-red-600">{errors.tenantName}</p>}
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="subdomain" className="text-sm font-medium text-slate-700">
                  Sous-domaine *
                </label>

                <div className="flex items-center gap-2">
                  <input
                    id="subdomain"
                    name="subdomain"
                    type="text"
                    placeholder="ma-boutique"
                    value={formData.subdomain}
                    onChange={handleChange}
                    className={errors.subdomain ? inputErr : inputOk}
                  />
                  <span className="text-sm text-slate-500 whitespace-nowrap">.flexdz.com</span>
                </div>

                {errors.subdomain ? (
                  <p className="text-sm text-red-600">{errors.subdomain}</p>
                ) : (
                  <p className="text-sm text-slate-500">
                    Votre boutique sera accessible sur: <span className="font-medium">{previewUrl}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <p className="text-sm text-slate-600">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-slate-900 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
