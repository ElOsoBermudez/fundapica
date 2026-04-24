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
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <CourseGrid type="personas" eyebrow="Personas" category={category} />
    </main>
  )
}
