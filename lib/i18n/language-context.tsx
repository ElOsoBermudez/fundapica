"use client"

import { createContext, useContext, useState } from "react"

export type Language = "es" | "ca"

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "es",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "es"

    const stored = window.localStorage.getItem("site-language")
    return stored === "es" || stored === "ca" ? stored : "es"
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("site-language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
