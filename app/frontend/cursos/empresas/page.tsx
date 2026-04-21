import { CourseCategoryGrid } from "@/components/cursos/category-grid"
import { getCategoriesByType } from "@/components/cursos/data"

export default function CursosEmpresasPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <CourseCategoryGrid
        type="empresas"
        eyebrow="Empresas"
        subtitle="Cuatro categorias orientadas a equipos, liderazgo y cultura corporativa dentro de una estructura preparada para crecer."
        categories={getCategoriesByType("empresas")}
      />
    </main>
  )
}
