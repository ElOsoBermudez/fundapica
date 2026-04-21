import { CourseCategoryGrid } from "@/components/cursos/category-grid"
import { getCategoriesByType } from "@/components/cursos/data"

export default function CursosPersonasPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <CourseCategoryGrid
        type="personas"
        eyebrow="Personas"
        subtitle="Cinco categorias iniciales para explorar itinerarios formativos de manera clara, directa y compatible con App Router."
        categories={getCategoriesByType("personas")}
      />
    </main>
  )
}
