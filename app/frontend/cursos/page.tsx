import { CoursesHeroSelector } from "@/components/cursos/hero-selector"

export default function CursosPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.08),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--secondary)/0.35))]">
      <CoursesHeroSelector />
    </main>
  )
}
