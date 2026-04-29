import { notFound } from "next/navigation"

import { CourseGrid } from "@/components/cursos/course-grid"
import { slugify } from "@/components/cursos/data"
import { createServerSupabaseClient } from "@/lib/supabase/server"

type EmpresasCategoriaPageProps = {
  params: Promise<{ categoria: string }>
}

export default async function EmpresasCategoriaPage({ params }: EmpresasCategoriaPageProps) {
  const { categoria } = await params
  const supabase = await createServerSupabaseClient()

  const { data: cats } = await supabase
    .from("categorias_cursos")
    .select("*")
    .eq("tipo", "empresas")

  const cat = (cats ?? []).find((c) => slugify(c.nombre) === categoria)
  if (!cat) notFound()

  const { data: cursosData } = await supabase
    .from("cursos")
    .select("*")
    .eq("categoria_id", cat.id)
    .order("created_at", { ascending: false })

  const category = {
    slug: categoria,
    title: cat.nombre,
    description: "",
    courses: (cursosData ?? []).map((c) => ({
      id: c.id,
      title: c.titulo,
      description: c.descripcion ?? "",
      image: c.imagen_url ?? undefined,
    })),
  }

  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-background">
      <CourseGrid type="empresas" eyebrow="Empresas" category={category} />
    </main>
  )
}
