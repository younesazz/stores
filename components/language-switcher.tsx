"use client"

import { useLang } from "@/lib/lang-store"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as any)}
      className="rounded-lg border px-2 py-1 text-sm bg-white dark:bg-slate-900"
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
  )
}
