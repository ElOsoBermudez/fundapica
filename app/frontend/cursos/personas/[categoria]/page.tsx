import { notFound } from "next/navigation"

import { CourseGrid } from "@/components/cursos/course-grid"
import { getCategoriesByType, getCategoryBySlug } from "@/components/cursos/data"

type PersonasCategoriaPageProps = {
  params: Promise<{
    categoria: string
  }>
}

export function generateStaticParams() {
  return getCategoriesByType("personas").map((category) => ({
    categoria: category.slug,
  }))
}

export default async function PersonasCategoriaPage({ params }: PersonasCategoriaPageProps) {
  const { categoria } = await params
  const category = getCategoryBySlug("personas", categoria)

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.08),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--secondary)/0.35))]">
      <CourseGrid type="personas" eyebrow="Personas" category={category} />
    </main>
  )
}
