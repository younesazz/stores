"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Lang } from "./i18n"

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
} | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used in LangProvider")
  return ctx
}
