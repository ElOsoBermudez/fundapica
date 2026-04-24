"use client"

import { useMemo, useState } from "react"
import type { NewsItem } from "../types"
import { NewsCard } from "./NewsCard"
import { NewsCategories } from "./NewsCategories"
import { useLanguage } from "@/lib/i18n/language-context"

type NewsListProps = {
  items: NewsItem[]
  categories: string[]
}

function applyLanguage(item: NewsItem, lang: "es" | "ca"): NewsItem {
  if (lang === "ca") {
    return {
      ...item,
      title: item.title_ca ?? item.title,
      description: item.description_ca ?? item.description,
      content: item.content_ca ?? item.content,
    }
  }
  return item
}

export function NewsList({ items, categories }: NewsListProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const localizedItems = useMemo(
    () => items.map((item) => applyLanguage(item, language)),
    [items, language]
  )

  const featuredNews = useMemo(() => localizedItems[0] ?? null, [localizedItems])

  const filteredItems = useMemo(() => {
    const rest = localizedItems.slice(1)
    return selectedCategory === "Todas"
      ? rest
      : rest.filter((item) => item.category === selectedCategory)
  }, [localizedItems, selectedCategory])

  return (
    <div className="space-y-16">
      {featuredNews ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#75A5E3]">
                {language === "ca" ? "Notícia destacada" : "Noticia destacada"}
              </p>
              <h2 className="mt-2 font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-5xl">
                {language === "ca" ? "La principal del dia" : "La principal del día"}
              </h2>
            </div>
          </div>
          <NewsCard news={featuredNews} featured />
        </section>
      ) : null}

      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#75A5E3]">
              {language === "ca" ? "Explora per tema" : "Explora por tema"}
            </p>
            <h2 className="mt-2 font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-5xl">
              {language === "ca" ? "Últimes notícies" : "Últimas noticias"}
            </h2>
          </div>
          <NewsCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-black/15 bg-[#F8FAFC] px-6 py-16 text-center">
            <p className="font-sans text-lg font-bold text-[#E05780]">
              {language === "ca"
                ? "Encara no hi ha notícies en aquesta categoria."
                : "Todavía no hay noticias en esta categoría."}
            </p>
            <p className="mt-2 font-[family:var(--font-body)] text-sm text-black/60">
              {language === "ca"
                ? "Prova un altre tema per continuar explorant el contingut disponible."
                : "Prueba otro tema para seguir explorando el contenido disponible."}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
