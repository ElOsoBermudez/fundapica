import Link from "next/link"
import { ArrowRight, BookOpenText, Newspaper, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LinkButton, ModuleHero } from "@/components/backoffice/dashboard/shared"
import type { ContentModule } from "@/components/backoffice/dashboard/types"

const moduleIcons = {
  news: Newspaper,
  blog: Sparkles,
  courses: BookOpenText,
} satisfies Record<ContentModule["id"], typeof Newspaper>

export function ContentPanel({
  modules,
  selectedModule,
  isAdmin,
}: {
  modules: ContentModule[]
  selectedModule: ContentModule
  isAdmin: boolean
}) {
  const activeRoleLabel = isAdmin ? "Administrador" : "Editor"
  const roleDescription = isAdmin
    ? "Puedes crear, revisar, publicar y reorganizar la arquitectura editorial completa."
    : "Puedes preparar borradores, corregir textos y dejar piezas listas para publicación."

  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Contenido"
        title="Mesa editorial del sitio"
        description="Este espacio organiza el trabajo de noticias, blog y cursos con una estructura clara, pensada para mantener el sitio actualizado sin mezclar tareas técnicas con trabajo editorial."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href={selectedModule.publicHref}>
              Ver sitio público
            </LinkButton>
            <LinkButton
              href={`/backend/backoffice/panel?view=content&section=${selectedModule.id}`}
              className="border-dashed"
            >
              Abrir módulo activo
            </LinkButton>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 lg:grid-cols-3">
          {modules.map((module) => {
            const active = module.id === selectedModule.id
            const Icon = moduleIcons[module.id]

            return (
              <Card
                key={module.id}
                className={cn(
                  "border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-transform",
                  active ? "ring-2 ring-[#E05780]/20" : "hover:-translate-y-0.5"
                )}
              >
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-[#E05780]">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/backend/backoffice/panel?view=content&section=${module.id}`}
                    className={buttonVariants({
                      variant: active ? "default" : "outline",
                      className: cn(
                        "h-11 w-full justify-between rounded-2xl",
                        active ? "bg-[#E05780] text-white hover:bg-[#d14a74]" : ""
                      ),
                    })}
                  >
                    {module.action}
                    <ArrowRight />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border-white/70 bg-[linear-gradient(145deg,#101828,#172033_58%,#22334f)] text-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <CardTitle className="text-xl">Capacidad de tu perfil</CardTitle>
            <CardDescription className="text-white/72">
              Vista activa para {activeRoleLabel.toLowerCase()}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/82">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Alcance
              </p>
              <p className="mt-2 leading-6">{roleDescription}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Recomendación de trabajo
              </p>
              <p className="mt-2 leading-6">
                Mantén cada pieza con título, estado editorial, imagen principal y una llamada a la acción coherente con la sección.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">{selectedModule.title}</CardTitle>
          <CardDescription>
            Guía operativa del módulo activo para que el equipo trabaje con un criterio común.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-3">
            <div className="rounded-2xl bg-secondary p-4 text-sm leading-6 text-muted-foreground">
              {selectedModule.summary}
            </div>
            <div className="rounded-2xl border border-border/70 p-4 text-sm leading-6 text-muted-foreground">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#E05780]">
                Enfoque editorial
              </span>
              <span className="mt-2 block">{selectedModule.focus}</span>
            </div>
          </div>

          <div className="space-y-3">
            {selectedModule.workflow.map((step) => (
              <div
                key={step}
                className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground"
              >
                {step}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
