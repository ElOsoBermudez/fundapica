import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NewsList } from "./components/NewsList"
import type { NewsItem } from "./types"

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

export default async function NewsPage() {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from("noticias")
    .select("*, categorias(nombre)")
    .order("created_at", { ascending: false })

  const items: NewsItem[] = (data ?? []).map((n, index) => ({
    id: n.id,
    title: n.titulo,
    title_ca: n.titulo_ca ?? null,
    description: n.contenido ? stripHtml(n.contenido).slice(0, 220) : "",
    description_ca: n.contenido_ca ? stripHtml(n.contenido_ca).slice(0, 220) : null,
    content: n.contenido ?? "",
    content_ca: n.contenido_ca ?? null,
    category: (n.categorias as unknown as { nombre: string } | null)?.nombre ?? "General",
    image: n.imagen_url ?? null,
    publishedAt: n.created_at,
    author: "Fundapica",
    featured: index === 0,
  }))

  const categories = ["Todas", ...Array.from(new Set(items.map((i) => i.category)))]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <NewsList items={items} categories={categories} />
      </div>
    </div>
  )
}
