import { CourseCategoryGrid } from "@/components/cursos/category-grid"
import { getCategoriesByType } from "@/components/cursos/data"

export default function CursosPersonasPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.08),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--secondary)/0.35))]">
      <CourseCategoryGrid
        type="personas"
        eyebrow="Personas"
        subtitle="Cinco categorias iniciales para explorar itinerarios formativos de manera clara, directa y compatible con App Router."
        categories={getCategoriesByType("personas")}
      />
    </main>
  )
}
