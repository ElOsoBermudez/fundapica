import { CourseCategoryGrid } from "@/components/cursos/category-grid"
import { slugify } from "@/components/cursos/data"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function CursosPersonasPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from("categorias_cursos")
    .select("*")
    .eq("tipo", "personas")
    .order("nombre")

  const categories = (data ?? []).map((cat) => ({
    slug: slugify(cat.nombre),
    title: cat.nombre,
    description: "",
    courses: [],
  }))

  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <CourseCategoryGrid
        type="personas"
        eyebrow="Personas"
        subtitle="Explora los itinerarios formativos disponibles para personas."
        categories={categories}
      />
    </main>
  )
}
