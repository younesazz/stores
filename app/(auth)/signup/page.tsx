"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/toaster"

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 20)
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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

  // ⌨️ ESC closes toasts (toaster already supports ESC globally)
  useEffect(() => {
    // nothing needed here; toaster handles ESC globally
  }, [])

  const previewUrl = useMemo(() => {
    const sub = formData.subdomain || "votre-sous-domaine"
    return `${sub}.flexdz.com`
  }, [formData.subdomain])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      if (name === "tenantName" && !prev.subdomain) next.subdomain = slugify(value)
      return next
    })

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = "Prénom requis"
    if (!formData.lastName) newErrors.lastName = "Nom requis"

    if (!formData.email) newErrors.email = "Email requis"
    else if (!isValidEmail(formData.email)) newErrors.email = "Email invalide"

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
    if (!validateForm()) {
      toast({
        variant: "error",
        title: "Erreur",
        description: "Veuillez corriger les champs en rouge.",
      })
      return
    }

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

      if (!res.ok) throw new Error(json?.error || "Erreur lors de l'inscription")

      toast({
        variant: "success",
        title: "Compte créé avec succès !",
        description: `Votre sous-domaine: ${(json?.data?.subdomain ?? formData.subdomain)}.flexdz.com`,
      })

      router.push("/login?registered=true")
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Erreur",
        description: err?.message || "Une erreur est survenue",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none transition focus:ring-2"
  const inputOk = `${inputBase} border-slate-200 dark:border-slate-800 focus:ring-slate-300 dark:focus:ring-slate-700`
  const inputErr = `${inputBase} border-red-500 focus:ring-red-200 dark:focus:ring-red-900`

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center">Créer votre boutique</h1>
          <p className="mt-2 text-center text-slate-600 dark:text-slate-300">
            Commencez à vendre en ligne en quelques minutes
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Infos personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
                {errors.firstName && <p className="text-sm text-red-600 dark:text-red-300">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
                {errors.lastName && <p className="text-sm text-red-600 dark:text-red-300">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
              {errors.email && <p className="text-sm text-red-600 dark:text-red-300">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
              {errors.phone && <p className="text-sm text-red-600 dark:text-red-300">{errors.phone}</p>}
            </div>

            {/* Mot de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={(errors.password ? inputErr : inputOk) + " pr-12"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 dark:text-red-300">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Confirmer *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={(errors.confirmPassword ? inputErr : inputOk) + " pr-12"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-300">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Infos boutique */}
            <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Informations de votre boutique
              </h3>

              <div className="space-y-2">
                <label htmlFor="tenantName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
                {errors.tenantName && <p className="text-sm text-red-600 dark:text-red-300">{errors.tenantName}</p>}
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="subdomain" className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
                  <p className="text-sm text-red-600 dark:text-red-300">{errors.subdomain}</p>
                ) : (
                  <p className="text-sm text-slate-500">
                    Votre boutique sera accessible sur:{" "}
                    <span className="font-medium">{previewUrl}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-slate-900 dark:text-white hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
