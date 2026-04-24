import { CourseCategoryGrid } from "@/components/cursos/category-grid"
import { slugify } from "@/components/cursos/data"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function CursosEmpresasPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from("categorias_cursos")
    .select("*")
    .eq("tipo", "empresas")
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
        type="empresas"
        eyebrow="Empresas"
        subtitle="Explora los programas formativos disponibles para empresas."
        categories={categories}
      />
    </main>
  )
}
