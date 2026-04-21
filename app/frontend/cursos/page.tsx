import { CoursesHeroSelector } from "@/components/cursos/hero-selector"
import SectionCourseAssistant from "@/app/frontend/sections/SectionCourseAssistant"

export default function CursosPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <CoursesHeroSelector />
      <SectionCourseAssistant />
    </main>
  )
}
